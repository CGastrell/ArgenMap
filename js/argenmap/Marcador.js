goog.provide('argenmap.Marcador');

goog.require('goog.asserts');
goog.require('goog.events.EventTarget');
/**
 * @class Clase para los marcadores de mapa
 * 
 * @constructor
 */
argenmap.Marcador = function()
{
	/**
	 * Título del marcador
	 * @type String
	 */
	this.titulo = "";
	
	/**
	 * Posicion del marcador. Representada por un objeto LatLng
	 * @type argenmap.LatLng
	 */
	this.posicion = null;
	
	/**
	 * Instancia del mapa donde esta ubicado
	 * @type argenmap.Mapa
	 */
	this.mapa = null;
	
};

/**
 * Establece el mapa donde va a ubicarse el Marcador y lo renderea
 * Es en este proceso que el marcador consulta la instancia del mapa
 * para saber que adaptador estamos usando y de esa manera utilizar el adaptador
 * correspondiente para el mapa
 * @type argenmap.Mapa
 */
argenmap.Marcador.prototype.establecerMapa = function(mapa)
{
	var claseDeMapa = mapa.claseBase;
	//siendo claseBase una propiedad del mapa que se ha seteado cuando se creo el mapa
	//ej: MapaDeGoogle, MapaOL, etc
	//ahora podemos switchear
	switch(claseDeMapa)
	{
		case argenmap.MapaDeGoogle:
			this.adaptador = new argenmap.MarcadorDeGoogle;
		break;
	}
	//para luego hacer la inicializacion correspondiente
	this.adaptador.inicializar();
}
// goog.inherits( argenmap.MapaDeGoogle, goog.events.EventTarget );
// goog.inherits( goog.events.EventTarget );

