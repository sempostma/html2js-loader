const compiler = require('./compiler.js');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

test('Loads HTML and outputs JavaScript', async () => {
  const { stats, result } = await compiler('./example.js');

  const { document, Node } = new JSDOM().window; /* expose for eval */
  const refHTML = fs.readFileSync(path.resolve(__dirname, './example.html')).toString();
  const refParent = document.createElement('div');
  refParent.innerHTML = refHTML;
  const ref = refParent.firstChild;

  const test = {};
  eval(result); /* sets test output */
  const { output } = test;

  expect(output.tagName).toBe(ref.tagName);
  expect(output.children.length).toBe(ref.children.length);
  expect(output.querySelector('img').src).toBe(ref.querySelector('img').src);
});


test('Test loading of inline SVG', async () => {
  const { stats, result } = await compiler('./svg.js');

  const { document, Node } = new JSDOM().window; /* expose for eval */
  const refHTML = fs.readFileSync(path.resolve(__dirname, './svg.html')).toString();
  const refParent = document.createElement('div');
  refParent.innerHTML = refHTML;
  const ref = refParent.firstChild;

  const test = {};
  eval(result); /* sets test output */
  const { output } = test;

  expect(output.tagName).toBe(ref.tagName);
});



