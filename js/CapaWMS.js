goog.provide('argenmap.CapaWMS');

argenmap.CapaWMS = function(opts)
{
	// El objeto ImageMapType q representa a esta capa en para la api de gmaps.
	this.imageMapType = null;
		// Referencia al objeto map de google. Se setea con argenmap.Mapa.agregarCapaWMS
		this.gmap = null;
	goog.mixin(this, opts);
	 //Creating the WMS layer options.  This code creates the Google imagemaptype options for each wms layer.  In the options the function that calls the individual 
			//wms layer is set 
		  
	 
	var wmsOptions = {
		alt: "MapServer Layer",
		getTileUrl:  goog.bind(this.WMSGetTileUrl, this),
		isPng: false,
		maxZoom: 17,
		minZoom: 6,
		name: "MapServer Layer",
		tileSize: new google.maps.Size(256, 256)
	};

        //Creating the object to create the ImageMapType that will call the WMS Layer Options.

        this.imageMapType = new google.maps.ImageMapType(wmsOptions);

}


  argenmap.CapaWMS.prototype.WMSGetTileUrl = function (tile, zoom) {
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
      var format = "image/png"; //type of image returned 
      //The layer ID.  Can be found when using the layers properties tool in ArcMap
      var layers = this.layers;
      var srs = "EPSG:4326"; //projection to display. This is the projection of google map. Don't change unless you know what you are doing.
      var bbox = ulw.lng() + "," + ulw.lat() + "," + lrw.lng() + "," + lrw.lat();
 
      //Add the components of the URL together
      var width = "256";
      var height = "256";
 
      var styles = "";
 
      var url = baseURL + "version=" + version + "&request=" + request + "&Layers=" + layers + "&Styles=" + styles + "&SRS=" + srs + "&BBOX=" + bbox + "&width=" + width + "&height=" + height + "&format=" + format + "&TRANSPARENT=TRUE";
      return url;
  }
