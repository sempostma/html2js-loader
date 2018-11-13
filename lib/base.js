module.exports = {
    document_createDocumentFragment: () => {
        return document.createDocumentFragment();
    },
    
    document_createElement: name => {
        return document.createElement(name);
    },
    
    document_createTextNode: text => {
        return document.createTextNode(text);
    },
    
    appendChild: (parent, child) => {
        parent.appendChild(child);
    },
    
    setAttribute: (elem, key, value) => {
        elem.setAttribute(key, value);
    }
};
