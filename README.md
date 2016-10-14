## typedoc-plugin-ui-router

### What

A plugin for [Typedoc](http://typedoc.org)

Customizes some stuff for the [UI-Router](https://ui-router.github.io/) documentation.


- Avoids "globals" module in favor of the index page
- Renames "External Modules" to "Modules" because "external modules" is confusing for a docs page

- Renames "Globals" nav item to "Subsystems" (configurable through command line argument `--navigation-label-globals`)
- Renames "Internals" nav item to "Public API" (configurable through command line argument `--navigation-label-internals`)
- Renames "Externals" nav item to "Internal UI-Router API" (configurable through command line argument `--navigation-label-externals`)
