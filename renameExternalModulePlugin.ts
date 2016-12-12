import {Component, ConverterComponent} from "typedoc/lib/converter/components";
import {ReflectionKind, Reflection} from "typedoc/lib/models";
import {GroupPlugin} from "typedoc/lib/converter/plugins";
import {Converter, Context} from "typedoc/lib/converter";

/** This plugin renames "External Modules" to "Modules" */
@Component({name:'RenameExtModule'})
export class RenameExternalModulePlugin extends ConverterComponent
{
  initialize() {
    this.monkeyPatchGetKindPlural();
    this.monkeyPatchGetKindSingular();

    this.listenTo(this.owner, {
      [Converter.EVENT_CREATE_DECLARATION]:   this.onDeclaration,
    });
  }

  monkeyPatchGetKindPlural() {
    let realFn = GroupPlugin.getKindPlural;
    GroupPlugin.getKindPlural = function getKindPlural(kind: ReflectionKind): string {

      /** Rename title of "External Modules" to simply "Modules" */
      if (kind === ReflectionKind.ExternalModule)
        return "Modules";

      return realFn.apply(GroupPlugin, arguments);
    }
  }

  monkeyPatchGetKindSingular() {
    let realFn = GroupPlugin.getKindSingular;
    GroupPlugin.getKindSingular = function getKindSingular(kind: ReflectionKind): string {

      /** Rename title of "External Modules" to simply "Modules" */
      if (kind === ReflectionKind.ExternalModule)
        return "Module";

      return realFn.apply(GroupPlugin, arguments);
    }
  }

  private onDeclaration(context: Context, reflection: Reflection, node?) {
    // placholdeer
  }

}

