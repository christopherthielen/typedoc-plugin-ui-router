import { ReflectionKind } from 'typedoc';
import { Converter } from 'typedoc/dist/lib/converter';

import * as renameNavLabelPlugin from './renameNavLabelPlugin';
import * as renameExternalModulePlugin from './renameExternalModulePlugin';

export function load({ application }) {
  // Remove all References
  application.converter.on(Converter.EVENT_RESOLVE_BEGIN, context => {
    for (const reflection of context.project.getReflectionsByKind(ReflectionKind.Reference)) {
      context.project.removeReflection(reflection);
    }
  });

  /**
   * used like so:
   * --navigation-label-globals "ui-router-ng2"
   * or
   * -nlg ui-router-ng2
   */
  application.options.addDeclaration({ name: 'navigation-label-globals', short: 'nlg' });
  /**
   * used like so:
   * --navigation-label-externals "UI-Router Internal API"
   * or
   * -nle "UI-Router Internal API"
   */
  application.options.addDeclaration({ name: 'navigation-label-externals', short: 'nle' });
  /**
   * -nli "Public API"
   */
  application.options.addDeclaration({ name: 'navigation-label-internals', short: 'nli' });

  application.renderer.addComponent('RenameNavLabel', renameNavLabelPlugin.RenameNavLabelPlugin);

  application.converter.addComponent('RenameExtModule', renameExternalModulePlugin.RenameExternalModulePlugin);
}
