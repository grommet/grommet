// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

module.exports = {
  scroll: function(element) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("scroll", false, true);
    element.dispatchEvent(evt);
  }
};
