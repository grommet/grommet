// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
module.exports = {
  // Components
  Document: require('./Document'),
  Hero: require('./Hero'),
  Site: require('./Site'),
  SiteHeader: require('./SiteHeader'),
  SiteFooter: require('./SiteFooter'),
  TBD: require('./TBD'),

  init: function () {

    if (! Modernizr.flexbox ||
      ! Modernizr.localstorage ||
      ! Modernizr.rgba ||
      ! Modernizr.draganddrop) {
      alert('Unfortunately, your browser appears to be too old. ' +
        'We recommend the latest version of Chrome, Firefox, Safari, or Internet Explorer.');
    }
  }
};
