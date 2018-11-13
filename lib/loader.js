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
  const options = getOptions(this);

  validateOptions(schema, options, 'HTML2JS Loader');

  source = parse(source);

  const common = `import { ${ imports.join(', ') } } from ` +
    stringifyRequest(this, "!" + require.resolve("./base")) +
    ";\n\n";

  return common + `export default ${source} }`;
}