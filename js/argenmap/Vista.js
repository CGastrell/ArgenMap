goog.provide('argenmap.Vista');

goog.require('goog.asserts');
goog.require('goog.array');
goog.require('argenmap.Mapa');


/**
 * @class Una vista es una representación de un estado particular de un mapa. Es decir:<br/>
 * <ul>
 * <li>Las capas base disponibles.
 * <li>El centro de la vista.
 * <li>La capa base  inicial a mostrar.
 * <li>Las capas WMS superpuestas sobre el mapa.
 * </ul>
 */
argenmap.Vista = function(opts)
{

	if (goog.isDef( opts ) ) {
		opts = goog.asserts.assertObject( opts );
	}
	this.capasBase_ = [];
	this.capaBaseInicial_ = null;
	this.capasWMS_ = [];
	this.centro_ = new argenmap.LatLng(-35,-63);
	this.zoom_ = 1;

	goog.mixin(this, opts);


};

/**
 * Carga los parámetros de la vista a partir del estado de un mapa.
 * @param {argenmap.Mapa} mapa el mapa del cual extraer los parámetros de la vista.
 */
argenmap.Vista.prototype.cargarDesdeMapa = function( mapa )
{
	mapa = goog.asserts.assertInstanceof( mapa, argenmap.Mapa );

	this.centro( mapa.centro());
	this.capasBase( mapa.capasBase() );
	this.capasWMS( mapa.capasWMS() );
	this.zoom( mapa.zoom() );
};
/**
 * carga o devuelve el centro de la vista.
 * @param [argenmap.LatLng] nuevoCentro el nuevoCentro a setear en la vista.
 * @return {argenmap.LatLng} el centro cargado en la vista.
 */
argenmap.Vista.prototype.centro = function( nuevoCentro )
{
	if (goog.isDef( nuevoCentro ) )	{
		nuevoCentro = goog.asserts.assertInstanceOf( argenmap.LatLng );
	}
	if ( nuevoCentro !==  undefined ) {
		this.centro_ = nuevoCentro;
	}
	
	return this.centro_;
};

/**
 * carga o devuelve el zoom de la vista.
 * @param [integer] nuevoZoom el nuevoZoom a setear en la vista.
 * @return {integer} el nivel de zoom  cargado en la vista.
 */
argenmap.Vista.prototype.zoom = function( nuevoZoom )
{
	if ( goog.isDef( nuevoZoom) ) {
		nuevoZoom = googl.asserts.assertNumber( nuevoZoom );
	}
	if ( nuevoZoom !==  undefined ) {
		this.zoom_ = nuevoZoom;
	}
	
	return this.zoom_;
};

/**
 * carga o devuelve las capas bases disponibles en esta vista.
 * @param [array] nuevasCapasBase las  nuevas CapasBase a setear en la vista.
 * @return {Array} las capas bases actualmente cargadas en la vista.
 */
argenmap.Vista.prototype.capasBase = function( nuevasCapasBase )
{
	if ( goog.isDef( nuevasCapasBase) ) {
		this.capasBase_ = goog.asserts.assertArray( nuevasCapasBase ) ;
	}
	return this.capasBase_;
};

argenmap.Vista.prototype.agregarCapaBase = function( nuevaCapaBase )
{
	goog.array.insert( this.capasBase_, nuevaCapaBase );
};

argenmap.Vista.prototype.quitarCapaBase = function( capaBase )
{
	if ( goog.array.contains( this.capasBase_, capaBase) ) {
		goog.array.remove( this.capasBase_, capaBase );
	}
};

argenmap.Vista.prototype.capaBaseInicial = function( capaBase )
{
	if ( goog.isDef(capaBase) && goog.array.contains( this.capasBase_, capaBase) ) {
		this.capaBaseInicial_ = capaBase;
	}

	if (! this.capaBaseInicial_) {
		return this.capasBase_[0];
	}
	return this.capaBaseInicial_;
};

argenmap.Vista.prototype.capasWMS = function( nuevascapasWMS )
{
	if ( goog.isDef( nuevascapasWMS ) ) {
		this.capasWMS_ = goog.asserts.assertArray( nuevascapasWMS );
	}
	return this.capasWMS_;
};

argenmap.Vista.prototype.agregarCapaWMS = function( nuevaCapaWMS )
{
	nuevaCapaWMS = goog.asserts.assertInstancof( argenmap.CapaWMS );
	goog.array.insert( this.capasWMS_, nuevaCapaWMS );
};

argenmap.Vista.prototype.quitarCapaWMS = function( capaWMS )
{
	nuevaCapaWMS = goog.asserts.assertInstancof( argenmap.CapaWMS );

	if ( goog.array.contains( this.capasWMS_, capaWMS) ) {
		goog.array.remove( this.capasWMS_, capaWMS );
	}
};

argenmap.Vista.prototype.toJSON = function()
{

	var capasBase = goog.array.map(
		this.capasBase_,
		function(capa) {
			if ( goog.isString( capa ) ) {
				return capa;
			}
			return capa.toJSON();
		},
		this
	);

	var capasWMS = goog.array.map(
		this.capasWMS_,
		function(capa) {
			return capa.toJSON();
		},
		this
	);

	return {
		capasbase: capasBase,
		capaswms: capasWMS,
		centro: this.centro().toJSON(),
		zoom: this.zoom()
	}
}

argenmap.Vista.prototype.toString = function()
{
	var serializer = new goog.json.Serializer();
	return serializer.serialize( {vista: this.toJSON() } );
};