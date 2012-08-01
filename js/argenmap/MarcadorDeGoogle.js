goog.provide('argenmap.MarcadorDeGoogle');

goog.require('goog.asserts');
goog.require('goog.events.EventTarget');
/**
 * @class Adaptador para argenmap.Marcador que utiliza la api de google maps v3 para construir mapas <br/>
 * https://developers.google.com/maps/documentation/javascript/reference#Marker
 * @constructor
 */
argenmap.MarcadorDeGoogle = function()
{
	// Muero si no está definido el objeto google maps
	goog.asserts.assert( google.maps );
};

goog.inherits( argenmap.MacadorDeGoogle, goog.events.EventTarget );

/**
 * Inicializa el marcador de google
 * @private_
 */
argenmap.MarcadorDeGoogle.prototype.inicializar = function( mapCanvas )
{
};
