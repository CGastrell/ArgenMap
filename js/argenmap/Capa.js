goog.provide('argenmap.Capa');

goog.require('goog.json.Serializer');

/**
 * @class Representa una capa superpuesta sobre las capas base de un mapa.
 * Esta clase no debería ser instanciada directamente. Sirve
 * para que otros subtipos de capa hereden de esta clase.
 * @constructor
 */
argenmap.Capa = function()
{
	this.tipo = false;

};

goog.inherits( argenmap.Capa, goog.events.EventTarget );



argenmap.Capa.prototype.toJSON = function()
{
	var s = {
		nombre: this.name,
		baseurl: this.baseURL,
		tipo: this.tipo,
	} ;
	
	return s;
};

argenmap.Capa.prototype.toString = function()
{
	var serializer = new goog.json.Serializer();
	return serializer.serialize( this.toJSON() );

};