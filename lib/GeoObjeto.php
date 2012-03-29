<?php

require('geoPHP/geoPHP.inc');

class GeoObjeto {
	private $geometria_;
	// EL nombre del campo de la tabla que guarda el topónimo
	// del objeto
	private $atributoDeToponimo = 'nombre';

	private $atributos = array();
	
	function geometria()
	{
		$g = geoPHP::load( $this->atributos['geometria'] );
		return $g->getCentroid();
	}

	function centroide()
	{
		$g = geoPHP::load( $this->atributos['geometria'], 'wkt' );
		return $g->getCentroid();

	}

	function encuadre( $parte = false )
	{
		$g = geoPHP::load( $this->atributos['geometria'], 'wkt' );
		$encuadre = $g->getBBox();
		
		if ( $parte == 'minLat' ) {
			$encuadre = $encuadre['miny'];
		} else if ( $parte == 'minLng' ) {
			$encuadre = $encuadre['minx'];
		} else if ( $parte == 'maxLat' ) {
			$encuadre = $encuadre['maxy'];
		} else if ( $parte == 'maxLng') {
			$encuadre = $encuadre['maxx'];
		}

		return $encuadre;

	}
	function toponimo( $valor=false )
	{
		return $this->atr( $this->atributoDeToponimo );
	}

	function tipo ( $comoTexto = true )
	{
		if ( $comoTexto ) {
			$tipo = sprintf('%s, (tipo: %s)', GeoDB::resolverDominio ( $this->atr ( 'tipo' ) ), $this->atr('tipo') );
			$contenido = $this->contenido( true) ;
			if ($contenido ) {
				$tipo = sprintf("%s (contenido: %s)", $tipo, $contenido );
			}
			return $tipo;
		}
		return $this->atr ( 'tipo' );
	}

	function contenido( $comoTexto = true )
	{
		if ( $comoTexto ) {
			return GeoDB::resolverDominio ( $this->atr ( 'contenido' ) );
		}
		return $this->atr ( 'contenido' );
	}

	function operador( $comoTexto = true )
	{
		if ( $comoTexto ) {
			return GeoDB::resolverDominio ( $this->atr ( 'operador' ) );
		}
		return $this->atr ( 'operador' );
	}

	function atr($nombreAtributo, $valor = false)
	{
		return $this->atributo($nombreAtributo, $valor);
	}

	function atributo($nombreAtributo, $valor = false)
	{
		if ($valor ) {
			$this->atributos[$nombreAtributo] = $valor;
		}

		if ( isset( $this->atributos[$nombreAtributo] ) ) {
			return $this->atributos[$nombreAtributo];
		}
		return false;

		
	}
	/**
	 * carga un objeto desde una array
	 * sirve para una query con pedo que devuelve FETCH_ASSOC
	 */
	function desdeArray( $record )
	{
		$this->atributos = $record;

	}
}

?>