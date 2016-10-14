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
        define(["require", "exports", "typedoc/lib/converter/components", "typedoc/lib/output/components", "typedoc/lib/output/events", "typedoc/lib/utils/options", "typedoc/lib/models"], factory);
    }
})(function (require, exports) {
    "use strict";
    var components_1 = require("typedoc/lib/converter/components");
    var components_2 = require("typedoc/lib/output/components");
    var events_1 = require("typedoc/lib/output/events");
    var options_1 = require("typedoc/lib/utils/options");
    var models_1 = require("typedoc/lib/models");
    /**
     * This plugin customizes some typedoc stuff for ui-router docs
     */
    var RenameNavLabelPlugin = (function (_super) {
        __extends(RenameNavLabelPlugin, _super);
        function RenameNavLabelPlugin() {
            _super.apply(this, arguments);
        }
        /**
         * Rename the Default Theme's navigation labels:
         * - 'Globals' to 'Subsystems'
         * - 'Internals' to 'Public API'
         * - 'Externals' to 'Internal UI-Router API'
         */
        RenameNavLabelPlugin.prototype.initialize = function () {
            var options = this.application.options;
            options.read({}, options_1.OptionsReadMode.Prefetch);
            this.labels = {
                globals: options.getValue("navigation-label-globals") || "Subsystems",
                internals: options.getValue("navigation-label-internals") || "Public API",
                externals: options.getValue("navigation-label-externals") || "Internal UI-Router API",
            };
            this.listenTo(this.owner, (_a = {},
                _a[events_1.RendererEvent.BEGIN] = this.onBeginRenderer,
                _a
            ));
            var _a;
        };
        RenameNavLabelPlugin.prototype.onBeginRenderer = function (event) {
            var navigation = this.getNavigation();
            if (navigation)
                this.renameNavigationItems(navigation);
            this.useIndexForGlobals(event.project);
        };
        RenameNavLabelPlugin.prototype.useIndexForGlobals = function (project) {
            function findGlobalReflection(ref) {
                if (!ref)
                    return undefined;
                if (ref.kind === models_1.ReflectionKind.Global)
                    return ref;
                return findGlobalReflection(ref.parent);
            }
            var externalModules = project.getReflectionsByKind(models_1.ReflectionKind.ExternalModule);
            externalModules.map(findGlobalReflection).filter(function (x) { return !!x; }).forEach(function (global) { return global.url = "index.html"; });
        };
        RenameNavLabelPlugin.prototype.renameNavigationItems = function (navigation) {
            var _this = this;
            navigation.children.forEach(function (item) {
                // Disable globals.html in favor of index.html
                if (item.isGlobals)
                    item.url = 'index.html';
                // Override labels of navigation items
                if (item.isGlobals && item.title === 'Globals')
                    item.title = _this.labels.globals;
                if (item.isLabel && item.title === 'Internals')
                    item.title = _this.labels.internals;
                if (item.isLabel && item.title === 'Externals')
                    item.title = _this.labels.externals;
            });
        };
        RenameNavLabelPlugin.prototype.getNavigation = function () {
            var components = this.application.renderer.getComponents();
            var navigationPlugin = components.filter(function (c) { return c.componentName === 'navigation'; })[0];
            if (!navigationPlugin) {
                return console.log("typedoc-plugin-ui-router: WARNING: NavigationPlugin not loaded");
            }
            if (!navigationPlugin['navigation']) {
                return console.log("typedoc-plugin-ui-router: WARNING: NavigationPlugin.navigation not loaded");
            }
            return navigationPlugin['navigation'];
        };
        RenameNavLabelPlugin = __decorate([
            components_1.Component({ name: 'RenameNavLabel' })
        ], RenameNavLabelPlugin);
        return RenameNavLabelPlugin;
    }(components_2.RendererComponent));
    exports.RenameNavLabelPlugin = RenameNavLabelPlugin;
});
