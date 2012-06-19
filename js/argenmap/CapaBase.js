goog.provide('argenmap.CapaBase');

goog.require('goog.json.Serializer');

/**
 * Esto esta bien que este aca?
 * La idea es definir constantes por cada clase para lo 
 * que necesitemos, ej: argenmap.CapaBase
 */

/**
 * @class Representa una capa base de un mapa. No debería ser instanciada directamente. Sirve
 * para que otros subtipos de capa base hereden de esta clase.
 * @constructor
 */
argenmap.CapaBase = function()
{
};


argenmap.CapaBase.prototype.toJSON = function()
{
	var s = {
		nombre: this.name,
		baseurl: this.baseURL,
		tipo: this.tipo,
	} ;
	
	return s;
};

argenmap.CapaBase.prototype.toString = function()
{
	var serializer = new goog.json.Serializer();
	return serializer.serialize( this.toJSON() );

};