goog.provide('argenmap.Visualizador');

goog.require('goog.asserts');
goog.require('goog.events');
goog.require('goog.dom.ViewportSizeMonitor');

goog.require('argenmap.Mapa');
goog.require('argenmap.Vista');
goog.require('argenmap.ui.Visualizador');

/**
 * @class Representa a un visualizador de mapas compuesto por un mapa {argenmap.Map} y los controles del mismo.
 * @param {Object} opts opciones de inicio. Se hace un mixin de tops con this.
 * @constructor
 */
argenmap.Visualizador = function( opts ) {
	this.ui = null;
	this.div = false;

	this.vistaInicial = new argenmap.Vista( {
		capasBase_: [
			new argenmap.CapaBaseWMS({
					name: 'Capa Base IGN',
					baseURL: 'http://mapa.ign.gob.ar/geoserver/wms?',
					layers: 'capabasesigign'
			}),
			'satellite'
		],
		capasWMS_: [
			new argenmap.CapaWMS({
					baseURL: 'http://mapa.ign.gob.ar/geoserver/wms?',
					layers: 'capabasesigign'
			})
		],
		centro_: new argenmap.LatLng(-34.55129771092924, -62.27764892578125),
		zoom_: 5,
	});

	if ( goog.isDef( opts ) ) {
		goog.asserts.assertObject( opts );
	}

	goog.mixin(this, opts);

	this.mapa = new argenmap.Mapa();
	
	this.ui = new argenmap.ui.Visualizador();

	if ( this.div ) {
		this.mostrarEnDiv( this.div );
	}

	this.cargarVista( this.vistaInicial );
};

/**
 * Renderea el visualizador en un div contenedor.
 * @param {String} el id del div
 */
argenmap.Visualizador.prototype.mostrarEnDiv = function( divId )
{
	goog.asserts.assertString( divId );

	this.mapa.mostrarEnDiv( divId );
};

/**
 * @param {argenmap.Vista} vista La vista a cargar sobre el mapa
 */
argenmap.Visualizador.prototype.cargarVista = function( vista )
{
	goog.asserts.assertInstanceof( vista, argenmap.Vista );

	this.mapa.centro( vista.centro() );

	this.mapa.zoom( vista.zoom() );
	
	goog.array.forEach( vista.capasBase(), function(el, i, array) {
		this.mapa.agregarCapaBase ( el );
	}, this);

	goog.array.forEach( vista.capasWMS(), function(el, i, array) {
		this.mapa.agregarCapaWMS ( el );
	}, this);

	this.mapa.cambiarCapaBase( vista.capaBaseInicial() );

	
};