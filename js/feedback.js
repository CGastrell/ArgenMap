goog.provide('argenmap.feedback');

goog.require('goog.ui.Dialog');

argenmap.feedback = (function()
{
	return {
		containerId: 'disqus_thread',
		dialog: null,
		init: function()
		{	
			argenmap.feedback.dialog = argenmap.feedback.crearDialog();
		}
	}
})();

argenmap.feedback.mostrarDialog = function()
{
	argenmap.feedback.dialog.setVisible(true);	
}

argenmap.feedback.crearDialog = function()
{
	 if (! argenmap.feedback.dialog) {
		argenmap.feedback.dialog = new goog.ui.Dialog();
		argenmap.feedback.dialog.decorateInternal( goog.dom.getElement(argenmap.feedback.containerId) );
	 }
	 argenmap.feedback.dialog.setTitle('Observaciones');
	 argenmap.feedback.dialog.setButtonSet(null);
	 return argenmap.feedback.dialog;
}