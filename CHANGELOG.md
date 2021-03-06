## 4.0.1 (2020-08-08)

[Compare `typedoc-plugin-ui-router` versions 4.0.0 and 4.0.1](https://github.com/christopherthielen/typedoc-plugin-ui-router/compare/4.0.0...4.0.1)

### Features

- allow the navigation builder to select symbols based on object comparison to a reflection, not purely based on the reflection's name ([1463332](https://github.com/christopherthielen/typedoc-plugin-ui-router/commit/1463332))

# 4.0.0 (2020-07-19)

[Compare `typedoc-plugin-ui-router` versions 3.0.2 and 4.0.0](https://github.com/christopherthielen/typedoc-plugin-ui-router/compare/3.0.2...4.0.0)

### Code Refactoring

- read config from package.json in the 'docgen' key ([da49f94](https://github.com/christopherthielen/typedoc-plugin-ui-router/commit/da49f94))

### BREAKING CHANGES

- config is now read from package.json, not docgen.json

## 3.0.2 (2020-07-18)

[Compare `typedoc-plugin-ui-router` versions 3.0.1 and 3.0.2](https://github.com/christopherthielen/typedoc-plugin-ui-router/compare/3.0.1...3.0.2)

### Bug Fixes

- strip off /project/src/includes from included project source filenames ([e8f5103](https://github.com/christopherthielen/typedoc-plugin-ui-router/commit/e8f5103))

## 3.0.1 (2020-06-05)

[Compare `typedoc-plugin-ui-router` versions 3.0.0 and 3.0.1](https://github.com/christopherthielen/typedoc-plugin-ui-router/compare/3.0.0...3.0.1)

### Bug Fixes

- process reflections with missing reflection.sources ([1057722](https://github.com/christopherthielen/typedoc-plugin-ui-router/commit/1057722))

# 3.0.0 (2020-06-05)

[Compare `typedoc-plugin-ui-router` versions 2.0.2 and 3.0.0](https://github.com/christopherthielen/typedoc-plugin-ui-router/compare/2.0.2...3.0.0)

### Features

- Total reset of the plugin behavior -- now requires docgen.json and expects typedoc 0.17.x or above ([d62621f](https://github.com/christopherthielen/typedoc-plugin-ui-router/commit/d62621f))

## 2.0.2 (2020-05-25)

[Compare `typedoc-plugin-ui-router` versions 2.0.1 and 2.0.2](https://github.com/christopherthielen/typedoc-plugin-ui-router/compare/2.0.1...2.0.2)

### Features

- Remove all references from the program ([#160](https://github.com/christopherthielen/typedoc-plugin-ui-router/issues/160)) ([55255fb](https://github.com/christopherthielen/typedoc-plugin-ui-router/commit/55255fb))

## 2.0.1 (2020-01-19)

[Compare `typedoc-plugin-ui-router` versions 2.0.0 and 2.0.1](https://github.com/christopherthielen/typedoc-plugin-ui-router/compare/2.0.0...2.0.1)

- fix for typedoc 0.16.x: get options in onBeginRender not in initialize()
