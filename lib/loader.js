const { getOptions, stringifyRequest } = require('loader-utils');
const validateOptions = require('schema-utils');

const { parse } = require('./html2js');
const base = require('./base');

const imports = Object.keys(base);

const schema = {
  type: 'object',
  properties: {
    trimWhitespace: {
      type: 'boolean',
      default: false,
    },
    removeComments: {
      type: 'boolean',
      default: false,
    },
    skipEmptyTextNodes: {
      type: 'boolean',
      default: false,
    }
  }
};

module.exports = function (source) {
  const options = getOptions(this) || {};

  validateOptions(schema, options, 'html2js-loader');

  source = parse(source);

  const common = `const { ${ imports.join(', ') } } = require(` +
    stringifyRequest(this, "!" + require.resolve('./base')) +
    ");\n\n";

  return common + `module.exports = ${source}`;
}