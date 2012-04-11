goog.provide('argenmap.MapaDeGoogle');

goog.require('goog.asserts');
goog.require('goog.events.EventTarget');
/**
 * @class Adaptador para argenmap.Mapa que utiliza la api de google maps v3 para construir mapas <br/>
 * https://developers.google.com/maps/documentation/javascript/?hl=es-ES
 * @constructor
 */
argenmap.MapaDeGoogle = function()
{
	/**
	 * La referencia al objeto google.maps.Map
	 * @type {google.maps.Map}
	 */
	this.gmap = null;
	// Muero si no está definido el objeto google maps
	goog.asserts.assert( google.maps );
};

goog.inherits( argenmap.MapaDeGoogle, goog.events.EventTarget );

/**
 * Inicializa el mapa de google
 * @param {HTMLElement} mapCanvas el div sobre el cual volcar el mapa
 * @private_
 */
argenmap.MapaDeGoogle.prototype.inicializar = function( mapCanvas )
{
	var bsas = new google.maps.LatLng(-38,-63);

	var myOptions = {
	    zoom: this.zoom_,
		minZoom:5,
		center: new google.maps.LatLng( bsas.lat(), bsas.lng() ),
		scaleControl: true,
		streetViewControl: false,
		panControl:false,
		rotateControl: true
		//mapTypeId: google.maps.MapTypeId.SATELLITE
  };
  
  this.gmap = new google.maps.Map( mapCanvas , myOptions);
};

/**
 * Devuelve o setea el centro actual del mapa.
 * Si nuevoCentro es un argenmap.LatLng, centra
 * el mapa en esas coordenadas.
 * @param {argenmap.LatLng} [nuevoCentro] el nuevo centro para el mapa
 * @returns {argenmap.LatLng} el centro actual del mapa
 */
argenmap.MapaDeGoogle.prototype.centro = function( nuevoCentro )
{
	if ( goog.isDef( nuevoCentro ) ) {
		goog.asserts.assertInstanceof(nuevoCentro, argenmap.LatLng);
		this.gmap.panTo( nuevoCentro.gLatLng );
	}
	return new argenmap.LatLng(this.gmap.getCenter().lat(), this.gmap.getCenter().lng() );
};


/**
 * Devuelve o setea el zoom actual del mapa.
 * Si nuevoZoom no es nulo, cambia el zoom actual.
 * @param {Integer} [nuevoZoom] el nuevo zoom del mapa.
 * @return {Integer} el zoom actual del mapa.
 */
argenmap.MapaDeGoogle.prototype.zoom = function( nuevoZoom )
{
	if ( goog.isDef( nuevoZoom ) ) {
		goog.asserts.assertNumber(nuevoZoom) ;
		this.gmap.setZoom( nuevoZoom );

	}
	
	this.zoom_ = this.gmap.getZoom();
	return this.zoom_;
};  


/**
 * Mueve el mapa hasta poder acomodarse aproximadamente al encuadre pasado como parámetro.
 *@param {argenmap.EncuadreLatLng} nuevoEncuadre El nuevo encuadre para el mapa.
 */
argenmap.MapaDeGoogle.prototype.encuadrar = function( nuevoEncuadre )
{
	this.gmap.fitBounds( nuevoEncuadre);
};

/**
 * Agrega una capa base al set de capas bases disponibles para este mapa.
 *@param {Object | String} capa capa a agregar al set de capas bases disponibles para este mapa. Si es una string, debe ser "satellite", "roadmap", o "hybrid"
 * que son los identificadores de 'mapas base' de google maps
 */
argenmap.MapaDeGoogle.prototype.agregarCapaBase = function(capa)
{ 
		var mapTypeIds;
		// Si capa es String, asumo que es un id de capa de gmaps
		goog.asserts.assert( capa );

		if (goog.isString( capa ) ) {
			if ( goog.isDef( this.gmap.mapTypeControlOptions) ) {
				goog.array.insert(this.gmap.mapTypeControlOptions.mapTypeIds, capa );
				mapTypeIds = this.gmap.mapTypeControlOptions.mapTypeIds;
			} else {
				mapTypeIds = [ capa ];	
			}
		} else {

			capa.gmap = this.gmap;
			
			// Agrego la capa base como un nuevo "tipo de mapa" a al gmap;
			this.gmap.mapTypes.set(capa.imageMapType.name, capa.imageMapType);
			
	 
			if (goog.isDef( this.gmap.mapTypeControlOptions)  ) {
				mapTypeIds = this.gmap.mapTypeControlOptions.mapTypeIds;
				goog.array.insert(mapTypeIds, capa.imageMapType.name );
			} else {
				mapTypeIds = [ capa.imageMapType.name ];
			}
		}
		
		this.gmap.setOptions({
            mapTypeControlOptions: {
                mapTypeIds: mapTypeIds,
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
            }
        });

};


/**
 * Superpone una capa WMS sobre las capas base y las demás capas ya superpuestas
 *
 * @param {Object} capa La capa WMS a superponer sobre al mapa.
 */
argenmap.MapaDeGoogle.prototype.agregarCapaWMS = function( capa )
{
	
	goog.asserts.assertInstanceof( capa, argenmap.CapaWMS );
	
	capa.gmap = this.gmap;
	this.gmap.overlayMapTypes.insertAt(0, capa.imageMapType);

};

/**
 * @param {Object} capa La nueva capa base.
 */
argenmap.MapaDeGoogle.prototype.cambiarCapaBase = function(capa)
{
	// Si capa es String, asumo que es un id de capa de gmaps
	if ( goog.isString( capa ) ) {
		this.gmap.setMapTypeId( capa );
		return;
	}

	this.gmap.setMapTypeId( capa.imageMapType.name );
};

