var renameNavLabelPlugin = require('./renameNavLabelPlugin');
var renameExternalModulePlugin = require('./renameExternalModulePlugin');

module.exports = function(PluginHost) {
  var app = PluginHost.owner;
  /**
   * used like so:
   * --navigation-label-globals "ui-router-ng2"
   * or
   * -nlg ui-router-ng2
   */
  app.options.addDeclaration({ name: 'navigation-label-globals', short: 'nlg' });
  /**
   * used like so:
   * --navigation-label-externals "UI-Router Internal API"
   * or
   * -nle "UI-Router Internal API"
   */
  app.options.addDeclaration({ name: 'navigation-label-externals', short: 'nle' });
  /**
   * -nli "Public API"
   */
  app.options.addDeclaration({ name: 'navigation-label-internals', short: 'nli' });

  app.renderer.addComponent('RenameNavLabel', renameNavLabelPlugin.RenameNavLabelPlugin);

  app.converter.addComponent('RenameExtModule', renameExternalModulePlugin.RenameExternalModulePlugin);
};
