goog.provide('argenmap.MapaDeLeaflet');

goog.require('goog.asserts');
goog.require('goog.events.EventTarget');
/**
 * @class Adaptador para argenmap.Mapa que utiliza la api de cloudmade Leaflet para construir mapas <br/>
 * http://leaflet.cloudmade.com/reference.html
 * @constructor
 */
argenmap.MapaDeLeaflet = function()
{
	/**
	 * La referencia al objeto google.maps.Map
	 * @type {L.Map}
	 */
	this.lmap = null;
	
	this._layerControl = new L.Control.Layers();
	
	this._zoom = 5;
	// Muero si no está definido el objeto google maps
	// goog.asserts.assertObject( L.Map );
};

goog.inherits( argenmap.MapaDeLeaflet, goog.events.EventTarget );

/**
 * Inicializa el mapa de Leaflet
 * @param {HTMLElement} mapCanvas el div sobre el cual volcar el mapa
 * @private_
 */
argenmap.MapaDeLeaflet.prototype.inicializar = function( mapCanvas )
{
	//ojo con esto, como el Leaflet pide el divID como string tengo que tweakear aca
	if(goog.isObject(mapCanvas)) mapCanvas = mapCanvas.id;
	goog.asserts.assertString(mapCanvas);
	var bsas = new L.LatLng(-38,-63);

	var myOptions = {
	    zoom: this._zoom,
		minZoom:0,
		center: new L.LatLng( bsas.lat, bsas.lng ),
		zoomControl: true
  };
  
  this.lmap = new L.Map( mapCanvas , myOptions);
  this.lmap.addControl(this._layerControl);
};

/**
 * Devuelve o setea el centro actual del mapa.
 * Si nuevoCentro es un argenmap.LatLng, centra
 * el mapa en esas coordenadas.
 * @param {argenmap.LatLng} [nuevoCentro] el nuevo centro para el mapa
 * @returns {argenmap.LatLng} el centro actual del mapa
 */
argenmap.MapaDeLeaflet.prototype.centro = function( nuevoCentro )
{
	if ( goog.isDef( nuevoCentro ) ) {
		goog.asserts.assertInstanceof(nuevoCentro, argenmap.LatLng);
		this.lmap.panTo( new L.LatLng(nuevoCentro.lat(), nuevoCentro.lng()) );
	}
	return new argenmap.LatLng(this.lmap.getCenter().lat, this.lmap.getCenter().lng );
};


/**
 * Devuelve o setea el zoom actual del mapa.
 * Si nuevoZoom no es nulo, cambia el zoom actual.
 * @param {Integer} [nuevoZoom] el nuevo zoom del mapa.
 * @return {Integer} el zoom actual del mapa.
 */
argenmap.MapaDeLeaflet.prototype.zoom = function( nuevoZoom )
{
	if ( goog.isDef( nuevoZoom ) ) {
		goog.asserts.assertNumber(nuevoZoom) ;
		this.lmap.setZoom( nuevoZoom );

	}
	
	this._zoom = this.lmap.getZoom();
	return this._zoom;
};  


/**
 * Mueve el mapa hasta poder acomodarse aproximadamente al encuadre pasado como parámetro.
 *@param {argenmap.EncuadreLatLng} nuevoEncuadre El nuevo encuadre para el mapa.
 */
argenmap.MapaDeLeaflet.prototype.encuadrar = function( nuevoEncuadre )
{
	this.lmap.fitBounds( nuevoEncuadre);
};

/**
 * Agrega una capa base al set de capas bases disponibles para este mapa.
 *@param {Object} capa capa a agregar al set de capas bases disponibles para este mapa.
 */
argenmap.MapaDeLeaflet.prototype.agregarCapaBase = function(capa)
{
	//Leaflet, hasta donde vi, no puede cambiar la capa base, esto 
	//habria que fixarlo con un console.log(este mapa no admite ...)
	//y en esta funcion ignorar todo parametro y simplemente crear
	//la capa base de leaflet
	if(!goog.isObject(capa)) return;
	goog.asserts.assert( capa );
	
	var defaults = {
		baseURL:'',
		layers:'',
		format:'image/png8',
		transparent:false,
		attribution:'Capa Base'
	};
	goog.mixin(defaults, capa);
	goog.asserts.assert(defaults.baseURL);
	goog.asserts.assert(defaults.layers);
	
	capa = defaults;
	
	//esto esta fixado ignorando todo lo anterior
	var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png';
	var cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade';
	var cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttribution});
	
	this.lmap.addLayer(cloudmade);
	this._layerControl.addBaseLayer(cloudmade);
	/*
	var c = new L.TileLayer.WMS( capa.baseURL, {
		layers: capa.layers,
		format: capa.format,
		transparent: false,
		attribution: capa.nombre
	});
	*/
	//capa._map = this.lmap;
	//this.lmap.addLayer(capa);
	//this._layerControl.addBaseLayer(c,c.getAttribution());
};


/**
 * Superpone una capa WMS sobre las capas base y las demás capas ya superpuestas
 *
 * @param {Object} capa La capa WMS a superponer sobre al mapa.
 */
argenmap.MapaDeLeaflet.prototype.agregarCapaWMS = function( capa )
{
	
	goog.asserts.assertInstanceof( capa, argenmap.CapaWMS );

	var a = new L.TileLayer.WMS(capa.baseURL, {
		layers: capa.layers,
		format: 'image/png',
		transparent: true,
		attribution: "CAPA"
	});

	this.lmap.addLayer(a);
	this._layerControl.addOverlay(a,a.getAttribution());
	//capa._map = this.lmap;
	//this.gmap.overlayMapTypes.insertAt(0, capa.imageMapType);

};

/**
 * @param {Object} capa La nueva capa base.
 */
argenmap.MapaDeLeaflet.prototype.cambiarCapaBase = function(capa)
{
	// Si capa es String, asumo que es un id de capa de gmaps
	/* 
	if ( goog.isString( capa ) ) {
		this.gmap.setMapTypeId( capa );
		return;
	}

	this.gmap.setMapTypeId( capa.imageMapType.name );
	 */
	 console.log('not implemented yet');
};

