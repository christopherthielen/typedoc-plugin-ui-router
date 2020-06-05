import * as Handlebars from 'handlebars';

// Put {{ debug }} into a .hbs file in typedoc-default-themes to debug
Handlebars.registerHelper('debug', function (optionalValue) {
  console.log('Current Context');
  console.log('====================');
  console.log(this);

  if (optionalValue) {
    console.log('Value');
    console.log('====================');
    console.log(optionalValue);
  }
});
