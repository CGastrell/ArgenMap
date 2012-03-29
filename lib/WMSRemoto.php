<?php

require('cartoweb/wms_parser.php');
require('WMSCapabilitiesCache.php');

class WMSRemoto
{
	private $capabilities_ = '';
	private $capas_ = false;
	private $url_ = '';
	private $titulo_ = '';
	private $parser__ = false;
	private $parser_ = false;

	function __construct( $url )
	{
		$this->url_ = $url;

		$this->capabilities_ = WMSCapabilitiesCache::traerCapabilities( $url );
		
		// Inicializo el wms_parser
		$this->parser__ = new CapabilitiesParser();
		@$this->parser__->parse( $this->capabilities() );

		$this->titulo_ = $this->parseTitulo_( $this->capabilities() );
		$this->capas_ = $this->parseCapas_( $this->capabilities() );
		
	}



	function titulo()
	{
		return $this->titulo_;
	}

	function capas()
	{
		return $this->capas_;
	}

	function capabilities()
	{
		return $this->capabilities_;
	}
	
	function parseTitulo_( $capabilities )
	{
		return  $this->parser__->layer_props[0]['Title'];
	}

	function parseCapas_( $capabilities )
	{
		$capas = array();
		$this->parser_ = simplexml_load_string($this->capabilities(), "SimpleXMLElement");
		if ( ! $this->parser_ )
			die("no pude parsear el cache de $s[url] ($i)");
		
		if (!$this->parser_->Capability->Layer->Layer)
			die("No se encontraron las capas de $s[url]");
		$capasXML = $this->parser_->Capability->Layer->Layer;
		
		foreach($capasXML as $l) {
			/**
			 * Me meto dentro de los grupos de capas
			 */
			if ($l->Layer)
				$l = $l->Layer;


			$capas[] = $this->createLayerObject_($l);
			
		}
		return $capas;		
	}

	function createLayerObject_($layer)
	{
		$layerObject = Array();

		/**
		 * el campo nombre de la capa
		 */
		$layerObject['name'] = (string) $layer->Name;
		/* el título de la capa. es redundante
		 * pero a veces no se completa este campo en las propiedades
		 * de la capa cuando se configura.
	 */
		$layerObject['title'] = (string) $layer->Title;
		
		/**
		 * El resumen descriptivo de la capa
		 */
		$layerObject['abstract'] = (string) $layer->Abstract;
		
		/**
		 * El formato en que reporta las excepciones
		 * el servidor
		 */
		$layerObject['exception'] = (array) $this->parser_->Capability->Exception;
		/**
		 * los formatos de imagen disponibles para esta capa
		 */
		$getmap = (array) $this->parser_->Capability->Request->GetMap;
		$layerObject['formats'] = $getmap['Format'];
	
		/**
		 * Atributos de la capa. Queryable, opaque, cascaded
		 * 
		 */
		$attributes = (array) $layer->attributes();
		if (isset($attributes['@attributes'])) {
			$layerObject['attributes'] = $attributes['@attributes'];
		} else {
			$layerObject['attributes'] = Array();
		}
		/**
		 * versión del servicio WMS
		 */
		$attributes = (array) $this->parser_->attributes() ;
		 /**
		 * la url de la capa (servidor)
		 */
		if (isset($attributes['@attributes'])) {
			$aux = $getmap['DCPType']->HTTP->Get->OnlineResource->attributes('xlink',true);
			$layerObject['url'] =  (string) $aux['href'];
		} else {
			$layerObject['url'] = 'd';
		}
		/**
		 * La versión del servicion WMS
		 */
		$layerObject['version'] = $attributes['@attributes']['version'];

		/**
		 * El nombre del servidor que tiene esta capa
		 */
		$layerObject['servername'] = (string) $this->parser_->Service->Title;
		/**
		 * la url de este servicio WMS
		 */
		return $layerObject;
	}

	function __destruct()
	{
		$this->parser__->free_parser( );
	}

}