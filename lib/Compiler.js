'use strict';

let Joi = require('@hapi/joi');

class Compiler {
  constructor () {}

  compile (jsonSchemas) {
    let compiledSchemas = {};
    let _self = this;

    Object.keys(jsonSchemas).forEach(jsonSchemaKey => {
      let fieldSchema = jsonSchemas[jsonSchemaKey];
      compiledSchemas[jsonSchemaKey] = Joi[fieldSchema.type]();

      delete fieldSchema.type;
      // After we bootstrap with a type, apply additional validators
      Object.keys(fieldSchema).forEach(validator => {
        switch (validator) {
          case 'items':
            let items = jsonSchemas[jsonSchemaKey]['items'];

            let itemSchemas = [];
            items.forEach(item => {
              itemSchemas.push(_self.compile({
                'temp': item
              }).temp);
            });

            compiledSchemas[jsonSchemaKey] = compiledSchemas[jsonSchemaKey][validator].apply(compiledSchemas[jsonSchemaKey], itemSchemas);

            // We have ourselves an array here, TODO: Add assert or error

            break;

          case 'keys':
            compiledSchemas[jsonSchemaKey] = compiledSchemas[jsonSchemaKey]['keys'].call(compiledSchemas[jsonSchemaKey], _self.compile(fieldSchema['keys']));
            break;

          default:
            compiledSchemas[jsonSchemaKey] = compiledSchemas[jsonSchemaKey][validator].call(compiledSchemas[jsonSchemaKey], fieldSchema[validator]);
        }
      });
    });

    return compiledSchemas;
  }


}

module.exports = Compiler;
