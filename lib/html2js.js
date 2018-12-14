const { JSDOM } = require('jsdom');
const config = require('./config');

const svgNS = 'http://www.w3.org/2000/svg';

const escapeRegExp = text => text.replace(/\r?\n/gm, '\n').replace(/"/g, '\"');

const trimWhitespaceEscapeRegExp = text => text.replace(/\r?\n\s*/gm, '\n').replace(/"/g, '\"');

exports.parse = (html, { trimWhitespace = false, removeComments = false, skipEmptyTextNodes = false } = {}) => {
    const { document, Node } = new JSDOM().window;

    var div = document.createElement('div');
    div.innerHTML = html;
    div.normalize();
    var res = 'function () {\n';
    var vi = 0;

    if (div.childNodes.length > 1) {
        res += 'var container = ' + config.document.createDocumentFragment() + ';\n';
        div.childNodes.forEach(node => res += parseRecursive(div, 'container'));
        res += 'return container;\n';
    } else {
        res += parseRecursive(div.childNodes[0], null);
    }
    res += '}';
    return res;

    function parseRecursive(elem, parent) {
        var ret = '';
        switch (elem.nodeType) {
            case Node.COMMENT_NODE:
            if (removeComments) return ret;
            break;
            case Node.ELEMENT_NODE:
            break;
            case Node.CDATA_SECTION_NODE:
            case Node.TEXT_NODE:
            if (skipEmptyTextNodes && elem.textContent.trim() === '') return '';
            const textContent = trimWhitespace ? trimWhitespaceEscapeRegExp(elem.textContent) : escapeRegExp(elem.textContent);
            const textNodeInstruction = config.document.createTextNode(JSON.stringify(textContent));
            if (parent) ret += config.elem.appendChild(parent, textNodeInstruction) + ';\n';
            else ret += 'return ' + textNodeInstruction + ';\n';
            return ret;
            default: throw 'element with node type ' + elem.nodeType + ' should not be in loaded with this loader';
        }
        var name = 'e_' + vi++;
        ret += ('var ');
        ret += (name);
        if (elem.namespaceURI === svgNS) {
            ret += ' = ' + config.document.createElementNsSvg(JSON.stringify(elem.tagName.toLowerCase())) + ';\n';
        } else {
            ret += ' = ' + config.document.createElement(JSON.stringify(elem.tagName.toLowerCase())) + ';\n';
        }
        var attrs = Array.prototype.slice.apply(elem.attributes);
        for (var i = 0; i < attrs.length; i++) {
            ret += config.elem.setAttribute(name, JSON.stringify(attrs[i].name), JSON.stringify(attrs[i].value)) + ';\n';
        }
        var children = Array.prototype.slice.apply(elem.childNodes);
        for (var j = 0; j < children.length; j++) {
            ret += parseRecursive(children[j], name);
        }
        if (parent) ret += config.elem.appendChild(parent, name) + ';\n';
        else ret += 'return ' + name + ';\n';
        return ret;
    }
}
