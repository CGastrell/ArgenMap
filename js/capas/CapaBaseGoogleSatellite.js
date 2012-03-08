goog.provide('argenmap.capas.CapaBaseGoogleSatellite');


argenmap.capas.CapaBaseGoogleSatellite = function(opts) {
		// El objeto ImageMapType q representa a esta capa en para la api de gmaps.
		this.imageMapType = null;
		// Referencia al objeto map de google. Se setea con argenmap.Mapa.agregarCapaBaseWMS
		this.gmap = null;

		goog.mixin(this, opts);      
        //Creating the WMS layer options.  This code creates the Google imagemaptype options for each wms layer.  In the options the function that calls the individual 
        //wms layer is set 


        var wmsOptions = {
            alt: "OpenLayers",
            getTileUrl: goog.bind(this.WMSGetTileUrl, this),
            isPng: true,
            maxZoom: 17,
            minZoom: 1,
            name: "Base IGN",
            tileSize: new google.maps.Size(256, 256)

        };

  
        //Creating the object to create the ImageMapType that will call the WMS Layer Options.

        this.imageMapType = new google.maps.ImageMapType(wmsOptions);
}

