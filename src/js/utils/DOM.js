// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

const COLOR_RGB_REGEXP = /rgb\((\d+), (\d+), (\d+)\)/;
const COLOR_RGBA_REGEXP = /rgba\((\d+), (\d+), (\d+), ([\d\.]+)\)/;
const LIGHT_HINT_REGEXP = /^light/;

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

export function findScrollParents (element, horizontal) {
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
  // last scrollable element will be the document 
  // if nothing else is scrollable in the page
  if (result.length === 0) {
    result.push(document);
  }
  return result;
}

export function isDescendant (parent, child) {
  var node = child.parentNode;
  while (node != null) {
    if (node == parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

export function findAncestor (element, className) {
  var node = element.parentNode;
  while (node != null) {
    if (node.classList && node.classList.contains(className)) {
      break;
    }
    node = node.parentNode;
  }
  return node;
}

export function filterByFocusable (elements) {
  return Array.prototype.filter.call(elements || [], (element) => {
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
}

export function getBestFirstFocusable (elements) {
  var bestFirstFocusable;

  Array.prototype.some.call(elements || [], (element) => {
    var currentTag = element.tagName.toLowerCase();
    var isValidTag = currentTag.match(/(input|select|textarea)$/);
    return isValidTag ? ((bestFirstFocusable = element), true) : false;
  });

  if (!bestFirstFocusable) {
    bestFirstFocusable = this.filterByFocusable(elements)[0];
  }

  return bestFirstFocusable;
}

export function isFormElement (element) {
  const elementType = element ? element.tagName.toLowerCase() : undefined;
  return elementType && (
    elementType === 'input' || elementType === 'textarea'
  );
}

export function generateId (element) {
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
}

export function generateUUID () {
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  const uuid = `${S4()}${S4()}` +
    `-${S4()}-4${S4().substr(0, 3)}` +
    `-${S4()}-${S4()}${S4()}${S4()}`.toLowerCase();
  return uuid;
}

const CHECK_DARK_BACKGROUND_BACKOFFS = [0, 20, 80, 200];

function hasDarkBackground (element) {
  let result = false;
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
    if (0 === brightness) {
      // Browsers return 0,0,0 when they don't know yet.
      result = undefined;
      // changed threshold below to accomodate the Aruba theme for now
    } else if (brightness < 137) { ///125) {
      result = true;
    }
  }
  return result;
}

function checkDarkBackgroundBackoff (element, handler, backoffDurations) {
  return setTimeout(() => {
    let dark = hasDarkBackground(element);
    if (undefined === dark && backoffDurations.length > 0) {
      checkDarkBackgroundBackoff(element, handler, backoffDurations);
    } else {
      handler(dark);
    }
  }, backoffDurations.shift());
}

export function checkDarkBackground (colorIndex, element, handler) {
  let timer;
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
        timer = checkDarkBackgroundBackoff(element, handler,
          CHECK_DARK_BACKGROUND_BACKOFFS);
      }
    }
  }
  return { stop: () => clearTimeout(timer) };
}
