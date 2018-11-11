const compiler = require('./compiler.js');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

test('Inserts name and outputs JavaScript', async () => {
  const { stats, result } = await compiler('./example.js');

  const { document, Node } = new JSDOM().window; /* expose for eval */
  const refHTML = fs.readFileSync(path.resolve(__dirname, './example.html')).toString();
  const refParent = document.createElement('div');
  refParent.innerHTML = refHTML;
  const ref = refParent.firstChild;
  eval(result); /* sets global output */

  console.log(ref)
  expect(output.tagName).toBe(ref.tagName);
  expect(output.children.length).toBe(ref.children.length);
  expect(output.querySelector('img').src).toBe(ref.querySelector('img').src);
});
