goog.provide('argenmap.Marcador');

goog.require('goog.asserts');
goog.require('goog.events.EventTarget');
/**
 * @class Clase para los marcadores de mapa <br/>
 * https://developers.google.com/maps/documentation/javascript/reference#Marker
 * @constructor
 */
argenmap.Marcador = function()
{
	/**
	 * Aca habria que hacer otro adaptador? y tirar inherits?
	 * por ahora va fijo, pero atento
	 */
	// this.gmap = null;	

	// Muero si no está definido el objeto google maps
	goog.asserts.assert( google.maps );
};

// goog.inherits( argenmap.MapaDeGoogle, goog.events.EventTarget );
goog.inherits( goog.events.EventTarget );


