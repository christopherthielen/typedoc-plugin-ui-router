import * as fs from 'fs';
import { CliApplication, ContainerReflection, NavigationItem, ProjectReflection, ReflectionKind } from 'typedoc';
import { Context, Converter } from 'typedoc/dist/lib/converter';
import { PageEvent, RendererEvent } from 'typedoc/dist/lib/output/events';
import { find } from 'lodash';

import './GithubPluginMonkeyPatch';
import './handlebarsDebug';

interface Navigation {
  [sectionName: string]: Array<string | object>;
}

export function load({ application }: { application: CliApplication }) {
  const CONFIG = `package.json`;
  if (!fs.existsSync(CONFIG)) {
    throw new Error(`${process.cwd()}/${CONFIG} doesn't exist`);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG).toString()).docgen || {};
  const navigation: Navigation = config.navigation;
  if (!navigation || Object.keys(navigation).length === 0) {
    throw new Error(`${process.cwd()}/${CONFIG} doesn't contain a navigation object`);
  }

  application.converter.on(Converter.EVENT_RESOLVE_END, (context: Context) => {
    // Remove the "References" section (re-exports --  revisit this when Typedoc library mode lands in 0.18.x)
    for (const reflection of context.project.getReflectionsByKind(ReflectionKind.Reference)) {
      context.project.removeReflection(reflection);
    }

    // Rename other included @uirouter modules to a nicer name, e.g., @uirouter/core/state/stateService
    for (const reflection of context.project.getReflectionsByKind(ReflectionKind.Module)) {
      if ((reflection.sources || []).find((x) => x.fileName.includes('@uirouter'))) {
        const match = new RegExp('"?(node_modules/)?(@uirouter/[^/]+)(/lib|/src)?(/.*?)(.d)?"?$').exec(reflection.name);
        if (match) {
          reflection.name = `${match[2]}${match[4]}`;
        }
      }
    }

    // Rename source file names of included @uirouter files, stripping of the prefixed /src
    Object.values(context.project.reflections).forEach((reflection) => {
      if (!reflection.kindOf(ReflectionKind.Module)) {
        (reflection.sources || []).forEach((source) => {
          source.fileName = source.fileName.replace(/^\/?(project\/)?(src\/includes\/)?/g, '');
        });
      }
    });
  });

  // Do not show navigation for every Module.
  // Instead, load navigation from ${CONFIG} and manually construct the nav links
  application.renderer.on(PageEvent.BEGIN, (pageEvent: PageEvent) => {
    const reflection = pageEvent.model;
    let project = reflection as ProjectReflection;
    while (project && !(project instanceof ProjectReflection)) {
      project = (project as any).parent;
    }
    if (reflection instanceof ContainerReflection) {
      // Build the bespoke navigation from docgen.js
      const parent = pageEvent.navigation;
      parent.children = [];

      Object.keys(navigation).forEach((sectionName) => {
        const section = new NavigationItem(sectionName, null, parent);
        section.isVisible = true;

        navigation[sectionName].forEach((matchObject) => {
          if (typeof matchObject === 'string') {
            matchObject = { name: matchObject };
          }

          const child = find(Object.values(project.reflections), matchObject);

          if (child) {
            const item = new NavigationItem(child.name, child.url, parent, child.cssClasses, child);
            item.isVisible = true;
            item.isInPath = true;
            item.isCurrent = true;
          }
        });
      });
    }
  });

  application.renderer.on(RendererEvent.BEGIN, (rendererEvent: RendererEvent) => {
    const project = rendererEvent.project;

    // Make all links to the "Globals" reflection point to the index.html
    // Effectively replaces the "Globals" page with the index page.
    function findGlobalReflection(ref) {
      if (!ref) return undefined;
      if (ref.kind === ReflectionKind.Global) return ref;
      return findGlobalReflection(ref.parent);
    }

    // Why can't I find by ReflectionKind.Global?
    let externalModules = project.getReflectionsByKind(ReflectionKind.Module);
    externalModules
      .map(findGlobalReflection)
      .filter((x) => !!x)
      .reduce((acc, item) => (acc.includes(item) ? acc : acc.concat(item)), [])
      .forEach((global) => (global.url = 'index.html'));
  });
}
