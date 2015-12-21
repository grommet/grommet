// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP
module.exports = {
  findScrollParents: function (element, horizontal) {
    var result = [];
    var parent = element.parentNode;
    while (parent) {
      // 10px is to account for borders and scrollbars in a lazy way
      if (horizontal) {
        if (parent.clientWidth && parent.scrollWidth > (parent.clientWidth + 10)) {
          result.push(parent);
        }
      } else {
        if (parent.clientHeight && parent.scrollHeight > (parent.clientHeight + 10)) {
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

  isDescendant: function (parent, child) {
    var node = child.parentNode;
    while (node != null) {
      if (node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  },

  filterByFocusable: function(elements) {
    return Array.prototype.filter.call(elements || [], function(element) {
      var currentTag = element.tagName.toLowerCase();
      var validTags = /(svg|a|area|input|select|textarea|button|iframe)$/;
      var isValidTag = currentTag.match(validTags) && element.focus;

      if (currentTag === 'a') {
        return isValidTag && element.childNodes.length > 0;
      } else if (currentTag === 'svg') {
        return isValidTag && element.hasAttribute('tabindex');
      }

      return isValidTag;
    });
  },

  getBestFirstFocusable: function (elements) {
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
  }
};
