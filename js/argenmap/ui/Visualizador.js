goog.provide( 'argenmap.ui.Visualizador' );

goog.require('goog.events.EventTarget');
goog.require('goog.ui.Toolbar');
goog.require('goog.ui.ToolbarButton');



argenmap.ui.Visualizador = function()
{

}



/**
 * @param {element} container el contenedor sobre el cual renderear la barra de herramientas.
 * @deprecated
 */
argenmap.ui.Visualizador.prototype.attachToolbar = function(container) {
    var toolbar = new goog.ui.Toolbar();

    this.attachToolbarButton(toolbar, '1', 'List currently active tasks.', 'taskList');
    this.attachToolbarButton(toolbar, '2', 'List completed tasks.', 'completedTaskList');
    this.attachToolbarButton(toolbar, '3', 'List deleted tasks.', 'deletedTaskList');
    this.attachToolbarButton(toolbar, '4', 'Settings', 'settings');

    toolbar.render( container );
}
/**
 *
 * @param {goog.ui.Toolbar} toolbar La barra de herramientas.
 * @param {String} label {La etiqueta del botón.
 * @param {String} tooltipo el tooltip para cuando el mouse esté sobre el botón
 */
argenmap.ui.Visualizador.prototype.attachToolbarButton = function(toolbar, label, tooltip) {
    var button = new goog.ui.ToolbarButton( label );

	button.setTooltip(tooltip);
	toolbar.addChild(button, true);
//    goog.events.listen(button.getContentElement(), goog.events.EventType.CLICK, function() {} );
}

