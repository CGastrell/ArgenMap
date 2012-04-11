/**
 * La clase base para los mapas y visualizadores
 */
goog.provide('argenmap.Mapa');

goog.require('goog.asserts');

goog.require('argenmap.LatLng');
goog.require('argenmap.EncuadreLatLng');
goog.require('argenmap.MapaDeGoogle');


/**
 * @class Representa a un map dinámico renderado en un div. Recibe eventos del usuario
 * como clicks, drags, (pinch, y taps) y de la rueda del mouse. 
 *
 * Para renderear el mapa, es necesario llamar argenmap.Mapa.mostrarEnDiv() con un id de div válido.
 * @example
 * var mapa = new argenmap.Mapa();
 * mapa.mostrarEnDiv ( 'map_canvas' );
 * @constructor

 */
argenmap.Mapa = function()
{
	goog.events.EventTarget.call(this);
	/**
	 * Referencia al objeto map de google que se usa para mostrar el argenmap.Mapa
	 * @private 
	 * @type google.maps.Map
	 */
	this.gmap = null;
	/** 
	 * Capas base disponibles en este mapa
	 * @type {Array}
	 * @private
	 */
	this.capasBase_ = [];
	/**
	 * El zoom actual del mapa
	 * @type {Number}
	 * @private
	 */
	this.zoom_ = 5;
	/**
	 * el elemento html (generalmente un div) utilizado
	 * para renderear el mapa y los encabezados.
	 * @type {HTMLElement}
	 * @private
	 */
	this.contenedor_ = false;
	/**
	 * el elemento html (generalmente un div) utilizado
	 * para renderear el encabezador del mapa .
	 * @type {HTMLElement}
	 * @private
	 */
	this.mapHeader_ = false;
	/**
	 * el elemento html (generalmente un div) utilizado
	 * para renderear el pie del  mapa.
	 * @type {HTMLElement}
	 * @private
	 */
	this.mapFooter_ = false;
	/**
	 * el elemento html (generalmente un div) utilizado
	 * para renderear el mapa.
	 * @type {HTMLElement}
	 * @private
	 */
	this.mapCanvas_ = false;
	/**
	 * El adaptador de la api de mapas a usar
	 * @type {argenmap.MapaDeGoogle}
	 */
	this.adaptador = new argenmap.MapaDeGoogle();
};

//goog.inherits( argenmap.Mapa, goog.events.EventTarget );

/**
 * @const
 */
argenmap.Mapa.URL_LOGO = 'http://mapa.ign.gob.ar/argenmap/img/ign-logo-255x45.png';

/**
 * renderea un mapa usando un div como contenedor
 * 
 * @param {string} divId El id del contenedor
 * @example
 * a = new argenmap.Mapa() ;
 * a.mostrarEnDiv( 'map_canvas') ;
 */
argenmap.Mapa.prototype.mostrarEnDiv = function(divId)
{
	goog.asserts.assertString( divId );
  
	var mapCanvas = this.prepararContenedor_( divId );

	this.adaptador.inicializar( mapCanvas );  
  
 };



/**
 * Prepara un div contenedor del mapa. Configura el encabezado
 * y el footer del mapa en donde se muestran el logo y la leyenda
 * de autoría de los datos.
 * @param {string} divId el id del div contenedor.
 * @private 
 */
argenmap.Mapa.prototype.prepararContenedor_ = function( divId)
{

	goog.asserts.assertString( divId );

	this.mapCanvas_ = goog.dom.createDom('div', 'argenmapMapCanvas');
	this.mapHeader_ = goog.dom.createDom('div', 'argenmapMapHeader');
	this.mapFooter_ = goog.dom.createDom('div', 'argenmapMapFooter');
	var mapLogo = goog.dom.createDom('img');

	mapLogo.src=  argenmap.Mapa.URL_LOGO;
	
	goog.dom.appendChild( this.mapHeader_, mapLogo);

	this.contenedor_ = goog.dom.getElement( divId );

	goog.dom.appendChild(this.contenedor_, this.mapHeader_);
	goog.dom.appendChild(this.contenedor_, this.mapCanvas_);
	goog.dom.appendChild(this.contenedor_, this.mapFooter_);

	goog.dom.setTextContent( this.mapFooter_, 'Topónimos, datos vectoriales - 2012 Instituto Geográfico Nacional de la República Argentina');
	
	this.maximizarCanvas_();
	
 	return this.mapCanvas_;
};


/**
 * Cambia el tamaño del canvas del mapa de acuerdo al alto del contenedor (argenmap.Mapa.contenedor_ )
 */
argenmap.Mapa.prototype.maximizarCanvas_ = function()
{
	var dif = goog.style.getSize(this.contenedor_).height
		- goog.style.getSize( this.mapHeader_ ).height
		- goog.style.getSize( this.mapFooter_).height;

	goog.style.setSize( this.mapCanvas_, null,  dif ) ;
}

/**
 * Devuelve o setea el centro actual del mapa.
 * Si nuevoCentro es un argenmap.LatLng, centra
 * el mapa en esas coordenadas.
 * @param {argenmap.LatLng} [nuevoCentro] el nuevo centro para el mapa
 * @returns {argenmap.LatLng} el centro actual del mapa
 * @example
 * //Setear el centro en Buenos Aires
 * mapa = new argenmap.Mapa();
 * mapa.centro( new argenmap.LatLng(-34,-59) );
 * // Mostrar la longitud del centro actual
 * alert ( mapa.centro().lat() );
 */
argenmap.Mapa.prototype.centro = function( nuevoCentro )
{
	if ( goog.isDef( nuevoCentro ) ) {
		goog.asserts.assertInstanceof(nuevoCentro, argenmap.LatLng);
	}
	return this.adaptador.centro( nuevoCentro );
};

/**
 * Devuelve o setea el zoom actual del mapa.
 * Si nuevoZoom no es nulo, cambia el zoom actual.
 * @param {Integer} [nuevoZoom] el nuevo zoom del mapa.
 * @return {Integer} el zoom actual del mapa.
 */
argenmap.Mapa.prototype.zoom = function( nuevoZoom )
{
	if ( goog.isDef( nuevoZoom ) ) {
		goog.asserts.assertNumber(nuevoZoom) ;
	}
	
	return this.adaptador.zoom( nuevoZoom );
};  

/**
 * Mueve el mapa hasta poder acomodarse aproximadamente al encuadre pasado como parámetro.
 *@param {argenmap.EncuadreLatLng} nuevoEncuadre El nuevo encuadre para el mapa.
 */
argenmap.Mapa.prototype.encuadrar = function( nuevoEncuadre )
{
	//goog.asserts.assertInstanceof( nuevoEncuadre, argenmap.EncuadreLatLng);
	this.adaptador.encuadrar( nuevoEncuadre );
};

/**
 * Agrega una capa base al set de capas bases disponibles para este mapa.
 *@param {Object | String} capa capa a agregar al set de capas bases disponibles para este mapa. Si es una string, debe ser "satellite", "roadmap", o "hybrid"
 * que son los identificadores de 'mapas base' de google maps
 */
argenmap.Mapa.prototype.agregarCapaBase = function(capa)
{ 
		goog.asserts.assert( capa );
		this.adaptador.agregarCapaBase( capa );
};

/**
 * Superpone una capa WMS sobre las capas base y las demás capas ya superpuestas.
 * Esta función debería hacer un chequeo supersónico acerca de la versión y/o
 * existencia en el servidor especificado.
 *
 * @param {Object} capa La capa WMS a superponer sobre al mapa.
 */
argenmap.Mapa.prototype.agregarCapaWMS = function( capa )
{
	
	goog.asserts.assertInstanceof( capa, argenmap.CapaWMS );
	
	this.adaptador.agregarCapaWMS( capa );

};
/**
 * @param {Object} capa La nueva capa base.
 */
argenmap.Mapa.prototype.cambiarCapaBase = function(capa)
{
	// Si capa es String, asumo que es un id de capa de gmaps
	this.adaptador.cambiarCapaBase( capa );
};

/**
 * Sincroniza el centro y el nivel de zoom de un  mapa.
 * con los de éste. Al moverse éste mapa, se mueve el otro.
 *@param {argenmap.Mapa} mapa El mapa q va a moverse sincronizado con éste.
 *@deprecated
 */
argenmap.Mapa.prototype.sincronizarCon = function( mapa )
{
	goog.asserts.assertInstanceof( mapa, argenmap.Mapa);
	var esteMapa = this;

	function doIt() {
		mapa.centro( esteMapa.centro() ) ;
		mapa.zoom( esteMapa.zoom() );
	}

	doIt();

	
	google.maps.event.addListener(this.adaptador.gmap, 'center_changed', function() {
		doIt();
	});

	google.maps.event.addListener(this.adaptador.gmap, 'bounds_changed', function() {
		doIt();
	});
};



