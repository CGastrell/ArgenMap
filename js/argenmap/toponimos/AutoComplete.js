goog.provide('argenmap.toponimos.AutoComplete');


argenmap.toponimos.AutoComplete = function()
{
	this.ac_ = null;
	this.matches_ = [];
	var self_ = this;

	var input = document.getElementById("txtInput");

	this.ac_ = new goog.ui.AutoComplete.Remote("http://api.ign.gob.ar/feature/search.json?fuente=prosiga&tipo=toponimo",
        input);
	this.ac_.matcher_.buildUrl = function(uri, token, maxMatches, useSimilar, opt_fullString) {
		
		var url = new goog.Uri(uri);
		
		url.setParameterValue('q', token);
		//url.setParameterValue('jsonp_callback', 'argenmap.visor.respuestaAutocomplete');
		url.setParameterValue('limit', String(maxMatches));
		url.setParameterValue('use_similar', String(Number(useSimilar)));
		return url.toString();
	};

	this.ac_.matcher_.parseResponseText = function( responseText )
	{
		var obj = goog.ui.AutoComplete.RemoteArrayMatcher.prototype.parseResponseText( responseText ) ;

		self_.matches_ = obj.matches;

		return goog.array.map(obj.matches, function(el, i, array) { return el.title } );
	}

}

