'use strict';

let Confidence = require('confidence');
let Compiler = require('./Compiler');
let glob = require('glob');
const METHODS = ['PATCH', 'PUT', 'GET', 'POST', 'DELETE'];

class Aggregator {

  constructor(schemaDir) {
    let compiler = new Compiler();
    this.files = glob.sync('**/*.json', {
      cwd: schemaDir
    });
    this.schemas = {};

    this.stores = {};
    this.files.forEach(file => {
      let validationName = file.split('.')[0];
      this.schemas[validationName] = {};
      this.stores[validationName] = new Confidence.Store(require(`${schemaDir}/${file}`));
      METHODS.forEach(method => {
        const schemaMethod = this.stores[validationName].get('/', {
          'method': method
        });

        this.schemas[validationName][method] = compiler.compile(schemaMethod);
      });
    });

  }
}

module.exports = Aggregator;
