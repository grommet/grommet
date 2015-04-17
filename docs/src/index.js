// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

require('imports?this=>window!modernizr');

if (! Modernizr.flexbox ||
  ! Modernizr.localstorage ||
  ! Modernizr.rgba ||
  ! Modernizr.draganddrop) {
  alert('Unfortunately, your browser appears to be too old. ' +
    'We recommend the latest version of Chrome, Firefox, Safari, or Internet Explorer. ' +
    'If you are using the latest Internet Explorer, you will need to turn off Compatibility Mode.');
}

if (__THEME__.hpe) {
  require("!style!css!sass!index-hpe.scss");
} else {
  require("!style!css!sass!index.scss");
}

require('./docs');
