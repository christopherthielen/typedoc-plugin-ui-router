import { Component } from 'typedoc/dist/lib/converter/components';
import { RendererComponent } from 'typedoc/dist/lib/output/components';
import { RendererEvent, PageEvent } from 'typedoc/dist/lib/output/events';
import { ConsoleLogger } from 'typedoc/dist/lib/utils';
import { Options } from 'typedoc/dist/lib/utils/options';
import { ProjectReflection } from 'typedoc';
import { ReflectionKind } from 'typedoc/dist/lib/models';

/**
 * This plugin customizes some typedoc stuff for ui-router docs
 */
@Component({ name: 'RenameNavLabel' })
export class RenameNavLabelPlugin extends RendererComponent {
  labels: {
    globals: string;
    internals: string;
    externals: string;
  };

  /**
   * Rename the Default Theme's navigation labels:
   * - 'Globals' to 'Subsystems'
   * - 'Internals' to 'Public API'
   * - 'Externals' to 'Internal UI-Router API'
   */
  initialize() {
    this.listenTo(this.owner, {
      [RendererEvent.BEGIN]: this.onBeginRenderer,
      // [PageEvent.BEGIN]:     this.onBeginPage,
    });
  }

  private onBeginRenderer(event: RendererEvent) {
    var options: Options = this.application.options;

    this.labels = {
      globals: (options.getValue('navigation-label-globals') as string) || 'Subsystems',
      internals: (options.getValue('navigation-label-internals') as string) || 'Public API',
      externals: (options.getValue('navigation-label-externals') as string) || 'Internal UI-Router API',
    };

    let navigation = this.getNavigation();
    if (navigation) this.renameNavigationItems(navigation);
    this.useIndexForGlobals(event.project);
  }

  private useIndexForGlobals(project: ProjectReflection) {
    function findGlobalReflection(ref) {
      if (!ref) return undefined;
      if (ref.kind === ReflectionKind.Global) return ref;
      return findGlobalReflection(ref.parent);
    }

    let externalModules = project.getReflectionsByKind(ReflectionKind.ExternalModule);
    externalModules
      .map(findGlobalReflection)
      .filter(x => !!x)
      .forEach(global => (global.url = 'index.html'));
  }

  private renameNavigationItems(navigation) {
    navigation.children.forEach(item => {
      // Disable globals.html in favor of index.html
      if (item.isGlobals) item.url = 'index.html';

      // Override labels of navigation items
      if (item.isGlobals && item.title === 'Globals') item.title = this.labels.globals;
      if (item.isLabel && item.title === 'Internals') item.title = this.labels.internals;
      if (item.isLabel && item.title === 'Externals') item.title = this.labels.externals;
    });
  }

  private getNavigation() {
    var components = this.application.renderer.getComponents();
    var navigationPlugin = components.filter(c => c.componentName === 'navigation')[0];

    if (!navigationPlugin) {
      return console.log('typedoc-plugin-ui-router: WARNING: NavigationPlugin not loaded');
    }
    if (!navigationPlugin['navigation']) {
      return console.log('typedoc-plugin-ui-router: WARNING: NavigationPlugin.navigation not loaded');
    }

    return navigationPlugin['navigation'];
  }
}
