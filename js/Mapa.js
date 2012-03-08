goog.provide('argenmap.Mapa');

goog.require('goog.events');
goog.require('goog.events.EventTarget');

argenmap.Mapa = function()
{
	goog.events.EventTarget.call(this);

	this.gmap = null;
	this.capasBase_ = [];
	this.zoom_ = 5;
	this.contenedor = false;
}

//goog.inherits( argenmap.Mapa, goog.events.EventTarget );

argenmap.Mapa.prototype.mostrarEnDiv = function(divId)
{
  var bsas = new google.maps.LatLng(-38,-63);
  var myOptions = {
    zoom: this.zoom_,
	minZoom:5,
    center: bsas,
	scaleControl: true,
	streetViewControl: false,
	panControl:false,
	rotateControl: true
    //mapTypeId: google.maps.MapTypeId.SATELLITE
  }
  
  var mapCanvas = this.prepararContenedor( divId );
  this.gmap = new google.maps.Map( mapCanvas , myOptions);
  gmap = this.gmap;
  /*
  var ctaLayer = new google.maps.KmlLayer(
		'http://wcs.ign.gob.ar/pg/elgg-maps/viewlayer/365',
		{preserveViewport:true}
   );
  ctaLayer.setMap(map);
  */
}

argenmap.Mapa.prototype.prepararContenedor = function( divId)
{

	var mapCanvas = goog.dom.createDom('div', 'argenmapMapCanvas');
	var mapHeader = goog.dom.createDom('div', 'argenmapMapHeader');
	var mapFooter = goog.dom.createDom('div', 'argenmapMapFooter');
	var mapLogo = goog.dom.createDom('img');
	mapLogo.src=  'http://mapa.ign.gob.ar/argenmap/img/ign-logo-255x45.png';
	
	goog.dom.appendChild(mapHeader, mapLogo);

	this.contenedor = goog.dom.getElement( divId );

	goog.dom.appendChild(this.contenedor, mapHeader);
	goog.dom.appendChild(this.contenedor, mapCanvas);
	goog.dom.appendChild(this.contenedor, mapFooter);
	goog.dom.setTextContent(mapFooter, 'Topónimos, datos vectoriales - 2012 Instituto Geográfico Nacional de la República Argentina');
	var dif = goog.style.getSize(this.contenedor).height
		- goog.style.getSize(mapHeader).height
		- goog.style.getSize(mapFooter).height;

	goog.style.setSize( mapCanvas, null,  dif ) ;



	return mapCanvas;
}

argenmap.Mapa.prototype.centro = function( nuevoCentro )
{
	if ( goog.isDef( nuevoCentro ) ) {
		this.gmap.setCenter( nuevoCentro );
	}
	return this.gmap.getCenter();
}

argenmap.Mapa.prototype.zoom = function( nuevoZoom )
{
	if ( goog.isDef( nuevoZoom ) ) {
		this.gmap.setZoom( nuevoZoom );
		this.zoom_ = nuevoZoom;
	}
	
	this.zoom_ = this.gmap.getZoom();
	return this.zoom_;
}  

argenmap.Mapa.prototype.encuadrar = function( nuevoEncuadre )
{
	this.gmap.fitBounds( nuevoEncuadre);
}

argenmap.Mapa.prototype.agregarCapaBase = function(capa)
{ 
		var mapTypeIds;
		// Si capa es String, asumo que es un id de capa de gmaps

		if (goog.isString( capa ) ) {
			goog.array.insert(this.gmap.mapTypeControlOptions.mapTypeIds, capa );
			mapTypeIds = this.gmap.mapTypeControlOptions.mapTypeIds;
		} else {

			capa.gmap = this.gmap;
			
			// Agrego la capa base como un nuevo "tipo de mapa" a al gmap;
			this.gmap.mapTypes.set(capa.imageMapType.name, capa.imageMapType);
			
	 


			if (goog.isDef( this.gmap.mapTypeControlOptions)  ) {
				mapTypeIds = this.gmap.mapTypeControlOptions.mapTypeIds;
				goog.array.insert(mapTypeIds, capa.imageMapType.name );
			} else {
				mapTypeIds = [ capa.imageMapType.name ];
			}
		}
		
		this.gmap.setOptions({
            mapTypeControlOptions: {
                mapTypeIds: mapTypeIds,
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
            }
        });

}

argenmap.Mapa.prototype.agregarCapaWMS = function(capa)
{
	capa.gmap = this.gmap;
	this.gmap.overlayMapTypes.insertAt(0, capa.imageMapType);

}

argenmap.Mapa.prototype.cambiarCapaBase = function(capa)
{
	// Si capa es String, asumo que es un id de capa de gmaps
	if (goog.isString( capa ) ) {
		this.gmap.setMapTypeId( capa );
		return;
	}
	this.gmap.setMapTypeId( capa.imageMapType.name );
}

argenmap.Mapa.prototype.sincronizarCon = function( mapa )
{
	var esteMapa = this;

	function doIt() {
		mapa.centro( esteMapa.centro() ) ;
		mapa.zoom( esteMapa.zoom() );
	}

	doIt();

	
	google.maps.event.addListener(this.gmap, 'center_changed', function() {
		doIt();
	});

	google.maps.event.addListener(this.gmap, 'bounds_changed', function() {
		doIt();
	});
}

argenmap.Mapa.prototype.urlQueryParams = function( baseURL )
{
	return '';
}
