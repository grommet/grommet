'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP
function hash(input) {
  var hash = 0,
      i,
      chr,
      len;
  if (input.length === 0) return hash;
  for (i = 0, len = input.length; i < len; i++) {
    chr = input.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

exports.default = {
  findScrollParents: function findScrollParents(element, horizontal) {
    var result = [];
    var parent = element.parentNode;
    while (parent && parent.getBoundingClientRect) {
      var rect = parent.getBoundingClientRect();
      // 10px is to account for borders and scrollbars in a lazy way
      if (horizontal) {
        if (rect.width && parent.scrollWidth > rect.width + 10) {
          result.push(parent);
        }
      } else {
        if (rect.height && parent.scrollHeight > rect.height + 10) {
          result.push(parent);
        }
      }
      parent = parent.parentNode;
    }
    if (result.length === 0) {
      result.push(document);
    }
    return result;
  },
  isDescendant: function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
      if (node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  },
  findAncestor: function findAncestor(element, className) {
    var node = element.parentNode;
    while (node != null) {
      if (node.classList && node.classList.contains(className)) {
        break;
      }
      node = node.parentNode;
    }
    return node;
  },
  filterByFocusable: function filterByFocusable(elements) {
    return Array.prototype.filter.call(elements || [], function (element) {
      var currentTag = element.tagName.toLowerCase();
      var validTags = /(svg|a|area|input|select|textarea|button|iframe|div)$/;
      var isValidTag = currentTag.match(validTags) && element.focus;

      if (currentTag === 'a') {
        return isValidTag && element.childNodes.length > 0 && element.getAttribute('href');
      } else if (currentTag === 'svg' || currentTag === 'div') {
        return isValidTag && element.hasAttribute('tabindex');
      }

      return isValidTag;
    });
  },
  getBestFirstFocusable: function getBestFirstFocusable(elements) {
    var bestFirstFocusable;

    Array.prototype.some.call(elements || [], function (element) {
      var currentTag = element.tagName.toLowerCase();
      var isValidTag = currentTag.match(/(input|select|textarea)$/);
      return isValidTag ? (bestFirstFocusable = element, true) : false;
    });

    if (!bestFirstFocusable) {
      bestFirstFocusable = this.filterByFocusable(elements)[0];
    }

    return bestFirstFocusable;
  },
  isFormElement: function isFormElement(element) {
    var elementType = element ? element.tagName.toLowerCase() : undefined;
    return elementType && (elementType === 'input' || elementType === 'textarea');
  },
  generateId: function generateId(element) {
    var id = void 0;
    var elementId = element.getAttribute('id');
    if (!elementId) {
      // IE11 fix: check for parentNode instead of parentElement
      var parentElement = element.parentElement || element.parentNode;
      if (parentElement) {
        id = hash(parentElement.innerHTML);
        element.setAttribute('id', id);
      }
    } else {
      id = elementId;
    }
    return id;
  }
};
module.exports = exports['default'];