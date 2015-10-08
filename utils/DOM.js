// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
'use strict';

module.exports = {
  findScrollParents: function findScrollParents(element) {
    var result = [];
    var parent = element.parentNode;
    while (parent) {
      // account for border the lazy way for now
      if (parent.scrollHeight > parent.offsetHeight + 10) {
        result.push(parent);
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

  filterByFocusable: function filterByFocusable(elements) {
    return Array.prototype.filter.call(elements || [], function (element) {
      var currentTag = element.tagName.toLowerCase();
      var validTags = /(svg|a|area|input|select|textarea|button|iframe)$/;
      var isValidTag = currentTag.match(validTags) && element.focus;

      if (currentTag === 'a') {
        return isValidTag && element.childNodes.length > 0;
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
  }
};