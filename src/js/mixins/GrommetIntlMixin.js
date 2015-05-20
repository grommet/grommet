// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

if (!global.Intl) {
  global.Intl = require('intl/Intl');
}

var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;

module.exports = {
  mixins: [IntlMixin],

  getChildContext: function () {
    if (!this.props.locales && !this.context.locales) {
      this.context.locales = 'en-US';
    }

    if (!this.props.messages && !this.context.messages) {
      try {
        this.context.messages = require('../messages/' + (this.props.locales || this.context.locales || 'en-US'));
      } catch (e) {
        this.context.messages = require('../messages/en-US');
      }
    }
  }
};
