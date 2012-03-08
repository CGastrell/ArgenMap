goog.provide('argenmap.Vista');
/**
 * Una vista es los que representa
 * al estado de un mapa. Es decir:
 * - Las capas base disponibles
 * - El centro de la vista
 * - La capa base  inicial a mostrar,
 * - Las capas WMS superpuestas sobre el mapa
 */
argenmap.Vista = function(opts)
{


	this.capasBase_ = [];
	this.capaBaseInicial_ = null;
	this.capasWMS_ = [];
	this.centro_ = new google.maps.LatLng(-35,-63);
	this.zoom_ = 1;

	goog.mixin(this, opts);


}

argenmap.Vista.prototype.cargarDesdeMapa = function( mapa )
{
	this.centro( mapa.centro());
	this.capasBase( mapa.capasBase() );
	this.capasWMS( mapa.capasWMS() );
	this.zoom( mapa.zoom() );
}

argenmap.Vista.prototype.centro = function( nuevoCentro )
{
	if ( nuevoCentro !==  undefined ) {
		this.centro_ = nuevoCentro;
	}
	
	return this.centro_;
}

argenmap.Vista.prototype.zoom = function( nuevoZoom )
{
	if ( nuevoZoom !==  undefined ) {
		this.zoom_ = nuevoZoom;
	}
	
	return this.zoom_;
}

/**
 * 
 */
argenmap.Vista.prototype.capasBase = function( nuevasCapasBase )
{
	if ( goog.isArray( nuevasCapasBase) ) {
		this.capasBase_ = nuevasCapasBase;
	}
	return this.capasBase_;
}

argenmap.Vista.prototype.agregarCapaBase = function( nuevaCapaBase )
{
	googe.array.insert( this.capasBase_, nuevaCapaBase );
}

argenmap.Vista.prototype.quitarCapaBase = function( capaBase )
{
	if ( goog.array.contains( this.capasBase_, capaBase) ) {
		goog.array.remove( this.capasBase_, capaBase );
	}
}

argenmap.Vista.prototype.capaBaseInicial = function( capaBase )
{
	if ( goog.isDef(capaBase) && goog.array.contains( this.capasBase_, capaBase) ) {
		this.capaBaseInicial_ = capaBase;
	}

	if (! this.capaBaseInicial_) {
		return this.capasBase_[0];
	}
	return this.capaBaseInicial_;
}

argenmap.Vista.prototype.capasWMS = function( nuevascapasWMS )
{
	if ( goog.isArray( nuevascapasWMS) ) {
		this.capasWMS_ = nuevascapasWMS;
	}
	return this.capasWMS_;
}

argenmap.Vista.prototype.agregarCapaWMS = function( nuevaCapaWMS )
{
	googe.array.insert( this.capasWMS_, nuevaCapaWMS );
}

argenmap.Vista.prototype.quitarCapaWMS = function( capaWMS )
{
	if ( goog.array.contains( this.capasWMS_, capaWMS) ) {
		goog.array.remove( this.capasWMS_, capaWMS );
	}
}