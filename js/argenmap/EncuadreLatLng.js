goog.provide('argenmap.EncuadreLatLng');

/**
 * @class Representa un encuadre (bounding box o extent) a partir de las esquinas sudoeste y noreste del encuadre.
 * @param {argenmap.LatLng} so esquina sudoeste del encuadre.
 * @param {argenmap.LatLng} ne esquina noreste del encuadre.
 * @constructor
 */
argenmap.EncuadreLatLng = function(so, ne)
{

	/**
	 * coordendas de la esquina sudoeste.
	 * @private
	 * @type {argenmap.LatLng} 
	 */
	this.sudoeste_ = new argenmap.LatLng( so.lat(), so.lng() );
	/**
	 * coordendas de la esquina noreste.
	 * @private
	 * @type {argenmap.LatLng} 
	 */
	this.noreste_ = new argenmap.LatLng( ne.lat, ne.lng() );

};

/**
 * Devuelve la esquina sudoeste del encuadre como un punto.
 *@returns {argenmap.LatLng} la esquina sudoeste del encuadre.
 */
argenmap.EncuadreLatLng.prototype.sudOeste = function()
{
	return this.sudoeste_;
};

/**
 * Devuelve la esquina noreste del encuadre como un punto.
 * @return {argenmap.LatLng} la esquina noreste del encuadre.
 */
argenmap.EncuadreLatLng.prototype.norEste = function()
{
	return this.noreste_;
};