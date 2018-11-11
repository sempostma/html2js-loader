const { getOptions, stringifyRequest } = require('loader-utils');
const validateOptions = require('schema-utils');

const { parse } = require('./html2js');

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    }
  }
};

module.exports = function (source) {
  const options = getOptions(this);

  validateOptions(schema, options, 'HTML2JS Loader');

  source = parse(source);

  const common = "import { document_createElement, document_createTextNode, "
    + "appendChild, setAttribute, document_createDocumentFragment } from " +
    stringifyRequest(this, "!" + require.resolve("./base")) +
    ";\n\n";

  return common + `export default ${source} }`;
}