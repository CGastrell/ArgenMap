goog.provide( 'argenmap.ui.Visualizador' );

goog.require('goog.ui.Toolbar');
goog.require('goog.ui.ToolbarButton');

argenmap.ui.Visualizador = function()
{
	goog.events.EventTarget.call(this);
}

goog.inherits(argenmap.ui.Visualizador, goog.events.EventTarget);

argenmap.ui.Visualizador.prototype.attachToolbar = function(container) {
    var toolbar = new goog.ui.Toolbar();

    this.attachToolbarButton(toolbar, '1', 'List currently active tasks.', 'taskList');
    this.attachToolbarButton(toolbar, '2', 'List completed tasks.', 'completedTaskList');
    this.attachToolbarButton(toolbar, '3', 'List deleted tasks.', 'deletedTaskList');
    this.attachToolbarButton(toolbar, '4', 'Settings', 'settings');

    toolbar.render( container );
}

argenmap.ui.Visualizador.prototype.attachToolbarButton = function(toolbar, label, tooltip, target) {
    var button = new goog.ui.ToolbarButton( label );

	button.setTooltip(tooltip);
	toolbar.addChild(button, true);
//    goog.events.listen(button.getContentElement(), goog.events.EventType.CLICK, mu.tutorial.tasks.switchPanel(target));
}

