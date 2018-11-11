module.exports = {
    document: {
        createElement: name => `document_createElement("${name}")`,
        createTextNode: text => `document_createTextNode("${text}")`,
        createDocumentFragment: () => 'document_createDocumentFragment()',
    },
    elem: {
        appendChild: (parent, child) => `appendChild(${parent}, ${child})`,
        setAttribute: (elem, key, value) => `setAttribute(${elem}, "${key}", "${value}")`
    }
};