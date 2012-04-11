goog.provide('argenmap.CapaBaseWMS_1_1');

goog.require('argenmap.CapaBase');
/**
 * @class Representa a una capa opaca de un servicio WMS 1.1 (http://en.wikipedia.org/wiki/WMS) que puede ser utilizada como capa base de los mapas.
 * @constructor
 * @param {Object} opts opciones para construir la capa
 */
argenmap.CapaBaseWMS_1_1 = function(opts) {
		argenmap.CapaBase.call(this);
		/**
		 * El objeto ImageMapType q representa a esta capa en para la api de gmaps.
		 * @public 
		 * @type google.maps.ImageMapType
		 */
		this.imageMapType = null;
		/**
		 * Referencia al objeto map de google sobre el cual está capa está desplegada.
		 * Se setea con argenmap.Mapa.agregarCapaBaseWMS()
		 * @public 
		 * @type google.maps.Map
		 */
		this.gmap = null;
		/**
		 * Un identificador de texto para esta capa. Este identificador
		 * es el que se mostrará en los selectores de capas del mapa.
		 * @public
		 * @default "Capa base WMS"
		 * @type google.maps.Map
		 */		
		this.name = "Capa base WMS";

		this.tipo = 'wms-1.1';
		
		goog.mixin(this, opts);      
        //Creating the WMS layer options.  This code creates the Google imagemaptype options for each wms layer.  In the options the function that calls the individual 
        //wms layer is set 


        var wmsOptions = {
            alt: "Capa base WMS",
            getTileUrl: goog.bind(this.WMSGetTileUrl, this),
            isPng: true,
            maxZoom: 17,
            minZoom: 1,
            name: this.name,
            tileSize: new google.maps.Size(256, 256)

        };

  
        //Creating the object to create the ImageMapType that will call the WMS Layer Options.

        this.imageMapType = new google.maps.ImageMapType(wmsOptions);
};

goog.inherits( argenmap.CapaBaseWMS_1_1, argenmap.CapaBase );

/**
 * Devuelve la url para conseguir una tile de google maps equivalente
 * en el servidor WMS
 * @param {google.maps.MapTile} tile La tile de GMap que se necesita emular en el servidor WMS
 * @param {Number} zoom El nivel de zoom actual. Utilizado para los cálculos de resoluciones
 */
argenmap.CapaBaseWMS_1_1.prototype.WMSGetTileUrl = function(tile, zoom) {
      var projection = this.gmap.getProjection();
      var zpow = Math.pow(2, zoom);
      var ul = new google.maps.Point(tile.x * 256.0 / zpow, (tile.y + 1) * 256.0 / zpow);
      var lr = new google.maps.Point((tile.x + 1) * 256.0 / zpow, (tile.y) * 256.0 / zpow);

      var ulw = projection.fromPointToLatLng(ul);
      var lrw = projection.fromPointToLatLng(lr);
      //The user will enter the address to the public WMS layer here.  The data must be in WGS84
      var baseURL = this.baseURL;
      var version = "1.1.1";
      var request = "GetMap";
      var format = "image%2Fpng8"; //type of image returned  or image/jpeg
      //The layer ID.  Can be found when using the layers properties tool in ArcMap or from the WMS settings 
      var layers = this.layers;
      //projection to display. This is the projection of google map. Don't change unless you know what you are doing.  
      //Different from other WMS servers that the projection information is called by crs, instead of srs
      var crs = "EPSG:4326"; 
      //With the 1.3.0 version the coordinates are read in LatLon, as opposed to LonLat in previous versions
      var bbox = ulw.lng() + "," + ulw.lat() + "," + lrw.lng() + "," + lrw.lat();
      var service = "WMS";
      //the size of the tile, must be 256x256
      var width = "256";
      var height = "256";
      //Some WMS come with named styles.  The user can set to default.
      var styles = "";
      //Establish the baseURL.  Several elements, including &EXCEPTIONS=INIMAGE and &Service are unique to openLayers addresses.

	  if (baseURL == 'http://mapa.ign.gob.ar/geoserver/wms?')  {
		  url = [
				'http://mapa.ign.gob.ar/geoserver/wms?',
				'http://wms.ign.gob.ar/geoserver/wms?'
		  ];
		  baseURL = url[Math.round(Math.random())];
	  }

      var url = baseURL + "Layers=" + layers + "&version=" + version + "&EXCEPTIONS=INIMAGE" + "&Service=" + service + "&request=" + request + "&Styles=" + styles + "&format=" + format + "&SRS=" + crs + "&CRS=" + crs + "&BBOX=" + bbox + "&width=" + width + "&height=" + height;
      return url;
  };