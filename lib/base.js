
export const document_createDocumentFragment = () => {
    return document.createDocumentFragment();
}

export const document_createElement = name => {
    return document.createElement(name);
}

export const document_createTextNode = text => {
    return document.createTextNode(text);
}

export const appendChild = (parent, child) => {
    parent.appendChild(child);
}

export const setAttribute = (elem, key, value) => {
    elem.setAttribute(key, value);
}
