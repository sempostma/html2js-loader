const svgNS = 'http://www.w3.org/2000/svg';

exports.document_createDocumentFragment = () => {
    return document.createDocumentFragment();
}

exports.document_createElement = name => {
    return document.createElement(name);
}

exports.document_createTextNode = text => {
    return document.createTextNode(text);
}

exports.appendChild = (parent, child) => {
    parent.appendChild(child);
}

exports.setAttribute = (elem, key, value) => {
    elem.setAttribute(key, value);
}

exports.document_createElementNsSvg = name => {
    return document.createElementNS(svgNS, name);
}

