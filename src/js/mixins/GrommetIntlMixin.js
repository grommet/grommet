// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;

if (!global.Intl) {
  global.Intl = require('intl');
}

module.exports = {
  mixins: [IntlMixin],

  getDefaultProps: function () {
    return {
      locales: 'en-US',
      messages: require('../messages/en-US')
    };
  }
};
