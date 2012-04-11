goog.provide('argenmap.LatLng');

goog.require('goog.asserts');
/**
 * @class Representa una coordenada (un punto geográfico)
 * @param {Float} lat latitud
 * @param {Float} lng longitud
 * @export
 * @constructor
 */
argenmap.LatLng = function(lat, lng)
{
	lat = goog.asserts.assertNumber( lat );
	lng = goog.asserts.assertNumber( lng );
	/**
	 * coordendas en formato google.maps.LatLng.
	 * @private
	 * @type {google.maps.LatLng} 
	 */
	this.gLatLng = new google.maps.LatLng(lat, lng);

};

/**
 * Devuelve la componente latitud en grados decimales
 * @returns {Float} la latitud en grados decimales
 */
argenmap.LatLng.prototype.lat = function()
{
	return this.gLatLng.lat();
};

/**
 * Devuelve la componente longitud  en grados decimales
 * @returns {Float} la longitud en grados decimales
 */
argenmap.LatLng.prototype.lng = function()
{
	return this.gLatLng.lng();
};

argenmap.LatLng.prototype.toJSON = function()
{
	var c = {
		lat: this.lat(),
		lng: this.lng()
	} ;
	
	return c;
};

argenmap.LatLng.prototype.toString = function()
{
	var serializer = new goog.json.Serializer();
	return serializer.serialize( this.toJSON() );

};