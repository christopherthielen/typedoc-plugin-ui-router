var __extends =
  (this && this.__extends) ||
  function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
  };
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
(function(dependencies, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === 'function' && define.amd) {
    define(dependencies, factory);
  }
})(
  [
    'require',
    'exports',
    'typedoc/dist/lib/converter/components',
    'typedoc/dist/lib/models',
    'typedoc/dist/lib/converter/plugins',
    'typedoc/dist/lib/converter',
  ],
  function(require, exports) {
    'use strict';
    var components_1 = require('typedoc/dist/lib/converter/components');
    var models_1 = require('typedoc/dist/lib/models');
    var plugins_1 = require('typedoc/dist/lib/converter/plugins');
    var converter_1 = require('typedoc/dist/lib/converter');
    /** This plugin renames "External Modules" to "Modules" */
    var RenameExternalModulePlugin = (function(_super) {
      __extends(RenameExternalModulePlugin, _super);
      function RenameExternalModulePlugin() {
        return _super.apply(this, arguments) || this;
      }
      RenameExternalModulePlugin.prototype.initialize = function() {
        this.monkeyPatchGetKindPlural();
        this.monkeyPatchGetKindSingular();
        this.listenTo(
          this.owner,
          ((_a = {}), (_a[converter_1.Converter.EVENT_CREATE_DECLARATION] = this.onDeclaration), _a),
        );
        var _a;
      };
      RenameExternalModulePlugin.prototype.monkeyPatchGetKindPlural = function() {
        var realFn = plugins_1.GroupPlugin.getKindPlural;
        plugins_1.GroupPlugin.getKindPlural = function getKindPlural(kind) {
          /** Rename title of "External Modules" to simply "Modules" */
          if (kind === models_1.ReflectionKind.ExternalModule) return 'Modules';
          return realFn.apply(plugins_1.GroupPlugin, arguments);
        };
      };
      RenameExternalModulePlugin.prototype.monkeyPatchGetKindSingular = function() {
        var realFn = plugins_1.GroupPlugin.getKindSingular;
        plugins_1.GroupPlugin.getKindSingular = function getKindSingular(kind) {
          /** Rename title of "External Modules" to simply "Modules" */
          if (kind === models_1.ReflectionKind.ExternalModule) return 'Module';
          return realFn.apply(plugins_1.GroupPlugin, arguments);
        };
      };
      RenameExternalModulePlugin.prototype.onDeclaration = function(context, reflection, node) {
        // placholdeer
      };
      return RenameExternalModulePlugin;
    })(components_1.ConverterComponent);
    RenameExternalModulePlugin = __decorate(
      [components_1.Component({ name: 'RenameExtModule' })],
      RenameExternalModulePlugin,
    );
    exports.RenameExternalModulePlugin = RenameExternalModulePlugin;
  },
);
