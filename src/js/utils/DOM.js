// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

module.exports = {
  findScrollParents: function (element) {
    var result = [];
    var parent = element.parentNode;
    while (parent) {
      // account for border the lazy way for now
      if (parent.scrollHeight > (parent.offsetHeight + 10)) {
        result.push(parent);
      }
      parent = parent.parentNode;
    }
    if (result.length === 0) {
      result.push(document);
    }
    return result;
  }
};
