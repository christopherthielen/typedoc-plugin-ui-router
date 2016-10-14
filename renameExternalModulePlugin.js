var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "typedoc/lib/converter/components", "typedoc/lib/models", "typedoc/lib/converter/plugins", "typedoc/lib/converter"], factory);
    }
})(function (require, exports) {
    "use strict";
    var components_1 = require("typedoc/lib/converter/components");
    var models_1 = require("typedoc/lib/models");
    var plugins_1 = require("typedoc/lib/converter/plugins");
    var converter_1 = require("typedoc/lib/converter");
    /**
     * This plugin renames "External Modules" to "Modules"
     */
    var RenameExternalModulePlugin = (function (_super) {
        __extends(RenameExternalModulePlugin, _super);
        function RenameExternalModulePlugin() {
            _super.apply(this, arguments);
        }
        RenameExternalModulePlugin.prototype.initialize = function () {
            this.monkeyPatchGetKindPlural();
            this.listenTo(this.owner, (_a = {},
                _a[converter_1.Converter.EVENT_CREATE_DECLARATION] = this.onDeclaration,
                _a
            ));
            var _a;
        };
        RenameExternalModulePlugin.prototype.monkeyPatchGetKindPlural = function () {
            var realFn = plugins_1.GroupPlugin.getKindPlural;
            plugins_1.GroupPlugin.getKindPlural = function getKindPlural(kind) {
                /** Rename title of "External Modules" to simply "Modules" */
                if (kind === models_1.ReflectionKind.ExternalModule)
                    return "Modules";
                return realFn.apply(plugins_1.GroupPlugin, arguments);
            };
        };
        RenameExternalModulePlugin.prototype.onDeclaration = function (context, reflection, node) {
            // placholdeer
        };
        RenameExternalModulePlugin = __decorate([
            components_1.Component({ name: 'RenameExtModule' })
        ], RenameExternalModulePlugin);
        return RenameExternalModulePlugin;
    }(components_1.ConverterComponent));
    exports.RenameExternalModulePlugin = RenameExternalModulePlugin;
});
