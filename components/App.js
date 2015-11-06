// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var Locale = require('../utils/Locale');
var SkipLinks = require('./SkipLinks');

var supportedLocales = ['en-US', 'pt-BR'];

function localesSupported() {
  return global.Intl && supportedLocales.every(function (locale) {
    return Intl.NumberFormat.supportedLocalesOf(locale)[0] === locale && Intl.DateTimeFormat.supportedLocalesOf(locale)[0] === locale;
  });
}

if (!localesSupported()) {
  require('intl');
  require('intl/locale-data/jsonp/en-US.js');
  require('intl/locale-data/jsonp/pt-BR.js');
  Intl.NumberFormat = IntlPolyfill.NumberFormat;
  Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
}

var App = React.createClass({
  displayName: 'App',

  propTypes: {
    centered: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      centered: true
    };
  },

  getInitialState: function getInitialState() {
    return {
      lang: 'en-US'
    };
  },

  componentDidMount: function componentDidMount() {
    var lang = Locale.getCurrentLocale();
    if (this.props.lang) {
      lang = this.props.lang;
    }

    if (!document.documentElement.getAttribute('lang')) {
      document.documentElement.setAttribute('lang', lang);
    }

    this.setState({ lang: lang });
  },

  render: function render() {
    var classes = ["app"];
    if (this.props.centered) {
      classes.push("app--centered");
    }
    if (this.props.inline) {
      classes.push("app--inline");
    }

    if (this.props.className) {
      classes.push(this.props.className);
    }

    return React.createElement(
      'div',
      { lang: this.state.lang, className: classes.join(' ') },
      React.createElement(SkipLinks, null),
      this.props.children
    );
  }
});

module.exports = App;