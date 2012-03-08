goog.provide('argenmap.Visualizador');

goog.require('argenmap.Mapa');
goog.require('argenmap.ui.Visualizador');

argenmap.Visualizador = function( opts ) {
	this.ui = null;
	this.div_ = false;

	goog.mixin(this, opts);

	this.mapa = new argenmap.Mapa();
	
	this.ui = new argenmap.ui.Visualizador();

	if ( this.div_ ) {
		this.mostrarEnDiv( this.div_ );
	}
}

argenmap.Visualizador.prototype.mostrarEnDiv = function( divId )
{
	this.mapa.mostrarEnDiv( divId );
}

argenmap.Visualizador.prototype.cargarVista = function( vista )
{

	this.mapa.centro( vista.centro() );

	this.mapa.zoom( vista.zoom() );
	
	goog.array.forEach( vista.capasBase(), function(el, i, array) {
		this.mapa.agregarCapaBase ( el );
	}, this);

	goog.array.forEach( vista.capasWMS(), function(el, i, array) {
		this.mapa.agregarCapaWMS ( el );
	}, this);

	this.mapa.cambiarCapaBase( vista.capaBaseInicial() );

	
}