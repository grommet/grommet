// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

const COLOR_RGB_REGEXP = /rgb\((\d+), (\d+), (\d+)\)/;
const COLOR_RGBA_REGEXP = /rgba\((\d+), (\d+), (\d+), ([\d\.]+)\)/;

function hash(input) {
  var hash = 0, i, chr, len;
  if (input.length === 0) return hash;
  for (i = 0, len = input.length; i < len; i++) {
    chr = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

export default {

  findScrollParents (element, horizontal) {
    var result = [];
    var parent = element.parentNode;
    while (parent && parent.getBoundingClientRect) {
      var rect = parent.getBoundingClientRect();
      // 10px is to account for borders and scrollbars in a lazy way
      if (horizontal) {
        if (rect.width && parent.scrollWidth > (rect.width + 10)) {
          result.push(parent);
        }
      } else {
        if (rect.height && parent.scrollHeight > (rect.height + 10)) {
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

  isDescendant (parent, child) {
    var node = child.parentNode;
    while (node != null) {
      if (node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  },

  findAncestor (element, className) {
    var node = element.parentNode;
    while (node != null) {
      if (node.classList && node.classList.contains(className)) {
        break;
      }
      node = node.parentNode;
    }
    return node;
  },

  filterByFocusable (elements) {
    return Array.prototype.filter.call(elements || [], function(element) {
      var currentTag = element.tagName.toLowerCase();
      var validTags = /(svg|a|area|input|select|textarea|button|iframe|div)$/;
      var isValidTag = currentTag.match(validTags) && element.focus;

      if (currentTag === 'a') {
        return isValidTag && element.childNodes.length > 0 &&
          element.getAttribute('href');
      } else if (currentTag === 'svg' || currentTag === 'div') {
        return isValidTag && element.hasAttribute('tabindex');
      }

      return isValidTag;
    });
  },

  getBestFirstFocusable (elements) {
    var bestFirstFocusable;

    Array.prototype.some.call(elements || [], function(element) {
      var currentTag = element.tagName.toLowerCase();
      var isValidTag = currentTag.match(/(input|select|textarea)$/);
      return isValidTag ? ((bestFirstFocusable = element), true) : false;
    });

    if (!bestFirstFocusable) {
      bestFirstFocusable = this.filterByFocusable(elements)[0];
    }

    return bestFirstFocusable;
  },

  isFormElement (element) {
    const elementType = element ? element.tagName.toLowerCase() : undefined;
    return elementType && (
      elementType === 'input' || elementType === 'textarea'
    );
  },

  generateId (element) {
    if (element) {
      let id;
      const elementId = element.getAttribute('id');
      if (!elementId) {
        // IE11 fix: check for parentNode instead of parentElement
        const parentElement = element.parentElement || element.parentNode;
        if (parentElement) {
          id = hash(parentElement.innerHTML);
          element.setAttribute('id', id);
        }
      } else {
        id = elementId;
      }
      return id;
    }
  },

  generateUUID () {
    function S4() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    const uuid = `${S4()}${S4()}` +
      `-${S4()}-4${S4().substr(0, 3)}` +
      `-${S4()}-${S4()}${S4()}${S4()}`.toLowerCase();
    return uuid;
  },

  hasDarkBackground (element) {
    // Measure the actual background color brightness to determine whether
    // to set a dark or light context.
    let result;
    if (element && window.getComputedStyle) {
      const color = window.getComputedStyle(element).backgroundColor;
      const match = color.match(COLOR_RGB_REGEXP) ||
        color.match(COLOR_RGBA_REGEXP);
      if (match) {
        const [red, green, blue] = match.slice(1).map(n => parseInt(n, 10));
        // http://www.had2know.com/technology/
        //  color-contrast-calculator-web-design.html
        const brightness = (
          (299 * red) + (587 * green) + (114 * blue)
        ) / 1000;
        result = brightness < 125;
      }
    }
    return result;
  }
};
