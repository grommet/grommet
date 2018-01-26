'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.findScrollParents = findScrollParents;
exports.isDescendant = isDescendant;
exports.findAncestor = findAncestor;
exports.filterByFocusable = filterByFocusable;
exports.getBestFirstFocusable = getBestFirstFocusable;
exports.isFormElement = isFormElement;
exports.generateId = generateId;
exports.generateUUID = generateUUID;
exports.checkDarkBackground = checkDarkBackground;
exports.findVisibleParent = findVisibleParent;
// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var COLOR_RGB_REGEXP = /rgb\((\d+), (\d+), (\d+)\)/;
var COLOR_RGBA_REGEXP = /rgba\((\d+), (\d+), (\d+), ([\d\.]+)\)/;
var LIGHT_HINT_REGEXP = /^light/;

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

function findScrollParents(element, horizontal) {
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
  // last scrollable element will be the document
  // if nothing else is scrollable in the page
  if (result.length === 0) {
    result.push(document);
  }
  return result;
}

function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node != null) {
    if (node == parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

function findAncestor(element, className) {
  var node = element.parentNode;
  while (node != null) {
    if (node.classList && node.classList.contains(className)) {
      break;
    }
    node = node.parentNode;
  }
  return node;
}

function filterByFocusable(elements) {
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
}

function getBestFirstFocusable(elements) {
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
}

function isFormElement(element) {
  var elementType = element ? element.tagName.toLowerCase() : undefined;
  return elementType && (elementType === 'input' || elementType === 'textarea');
}

function generateId(element) {
  if (element && typeof element.getAttribute === 'function') {
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
}

function generateUUID() {
  function S4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }
  var uuid = '' + S4() + S4() + ('-' + S4() + '-4' + S4().substr(0, 3)) + ('-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
  return uuid;
}

var CHECK_DARK_BACKGROUND_BACKOFFS = [0, 20, 80, 200];

function hasDarkBackground(element) {
  var result = false;
  var color = window.getComputedStyle(element).backgroundColor;
  var match = color.match(COLOR_RGB_REGEXP) || color.match(COLOR_RGBA_REGEXP);
  if (match) {
    var _match$slice$map = match.slice(1).map(function (n) {
      return parseInt(n, 10);
    }),
        _match$slice$map2 = _slicedToArray(_match$slice$map, 3),
        red = _match$slice$map2[0],
        green = _match$slice$map2[1],
        blue = _match$slice$map2[2];
    // http://www.had2know.com/technology/
    //  color-contrast-calculator-web-design.html


    var brightness = (299 * red + 587 * green + 114 * blue) / 1000;
    if (0 === brightness) {
      // Browsers return 0,0,0 when they don't know yet.
      result = undefined;
      // changed threshold below to accomodate the Aruba theme for now
    } else if (brightness < 137) {
      ///125) {
      result = true;
    }
  }
  return result;
}

function checkDarkBackgroundBackoff(element, handler, backoffDurations) {
  return setTimeout(function () {
    var dark = hasDarkBackground(element);
    if (undefined === dark && backoffDurations.length > 0) {
      checkDarkBackgroundBackoff(element, handler, backoffDurations);
    } else {
      handler(dark);
    }
  }, backoffDurations.shift());
}

function checkDarkBackground(colorIndex, element, handler) {
  var timer = void 0;
  if (colorIndex) {
    if ('dark' === colorIndex) {
      // caller knows
      handler(true);
    } else if (LIGHT_HINT_REGEXP.test(colorIndex)) {
      // skip if this is a 'light-*' color index
      handler(false);
    } else {
      // Measure the actual background color brightness to determine whether
      // to set a dark or light context.
      if (element && window.getComputedStyle) {
        timer = checkDarkBackgroundBackoff(element, handler, CHECK_DARK_BACKGROUND_BACKOFFS);
      }
    }
  }
  return { stop: function stop() {
      return clearTimeout(timer);
    } };
}

function findVisibleParent(element) {
  if (element) {
    return element.offsetParent ? element : findVisibleParent(element.parentElement);
  } else {
    return null;
  }
}