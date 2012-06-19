goog.provide('argenmap');

goog.require('goog.dom');
goog.require('goog.pubsub.PubSub');
goog.require('goog.events.EventTarget');
goog.require('goog.dom.ViewportSizeMonitor');

// lo pongo acá porque si lo trato de cargar con un require en cada archivo
// de clase que lo extiende, no lo levanta a tiempo como para poder satisfacer
// la línea de código goog.inherits q s ge ejecuta en el namespace global
//goog.require('goog.events.EventTarget');

 if ( window.google === undefined || google.maps === undefined) {
    goog.importScript_( 'http://maps.googleapis.com/maps/api/js?sensor=false&libraries=drawing,geometry' );
  }

/**
 * 
 * @const
 * @namespace  El espacio de nombres para argenmap-js y todos los módulos que componen la librería.
 * @export
 */
var argenmap = argenmap || {};

goog.inherits( argenmap, goog.events.EventTarget);

argenmap.tamanioDeViewport = function()
{
	var size = goog.dom.getViewportSize();
	return {
		alto: size.height,
		ancho: size.width
	};
}

argenmap.pubsub = new goog.pubsub.PubSub();

var vsm = new goog.dom.ViewportSizeMonitor();
//test
// vsm.addEventListener(goog.events.EventType.RESIZE, function(e)
// {
	// vsm.dispatchEvent('tete');
// });
goog.events.listen(vsm, goog.events.EventType.RESIZE, function(e) {
    argenmap.pubsub.publish( 'viewportcambiotamaño', { alto: e.target.size_.height, ancho: e.target.size_.width  });
});

argenmap.basePath = '';

goog.global.ARGENMAP_BASE_PATH = false;

  /**
   * Tries to detect the base path of the base.js script that bootstraps Closure
   * @private
   */
  argenmap.findBasePath_ = function() {
    if (goog.global.ARGENMAP_BASE_PATH) {
      argenmap.basePath = goog.global.ARGENMAP_BASE_PATH;
      return argenmap.basePath;
    } else if (!goog.inHtmlDocument_()) {
      return;
    }		
    var doc = goog.global.document;
    var scripts = doc.getElementsByTagName('script');
    // Search backwards since the current script is in almost all cases the one
    // that has base.js.
    for (var i = scripts.length - 1; i >= 0; --i) {
      var src = scripts[i].src;
      var qmark = src.lastIndexOf('?');
      var l = qmark == -1 ? src.length : qmark;
      if (src.substr(l - 11, 11) == 'argenmap.js') {
        return  src.substr(0, l - 11);
        
      }
    }
  };

  /*

   if (!goog.global.CLOSURE_NO_DEPS) {
    goog.importScript_(argenmap.findBasePath_() +'deps.js');
  }

 */