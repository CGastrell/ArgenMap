goog.provide('argenmap.GestorDeCapas.AutocompleteCapasIdera');

argenmap.GestorDeCapas.AutocompleteCapasIdera = function()
{
	/*
	 * instancia de mapa donde se adosaran las capas seleccionadas
	 * del listado autocomplete/typeahead
	 */
	this._mapaObjetivo = null;
	
	/*
	 * Configura el complemento para asignar las capas a una instancia de mapa
	 */
	this.adosarAMapa = function(instanciaDeMapa)
	{
		goog.asserts.assertInstanceof(instanciaDeMapa,argenmap.Mapa);
		this._mapaObjetivo = instanciaDeMapa;
	}
}
/*
un input con autocomplete/typeahead que liste las capas encontradas
por el crawler. Cuando se hace click en una de las capas, se agrega al mapa indicado
en la inicializacion de este "complemento"

crawler:
*/