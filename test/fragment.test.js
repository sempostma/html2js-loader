const compiler = require('./compiler.js');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

test('Test fragments', async () => {
    const { stats, result } = await compiler('./fragment.js');

    const { document, Node } = new JSDOM().window; /* expose for eval */
    const refHTML = fs.readFileSync(path.resolve(__dirname, './fragment.html')).toString();
    const ref = document.createElement('div');
    ref.innerHTML = refHTML;

    const test = {};
    eval(result); /* sets test output */
    const { output/* document fragment */ } = test;
    const testRoot = document.createElement('div');
    testRoot.appendChild(output/* document fragment */);

    expect(testRoot.children.length).toBe(ref.children.length);
});

