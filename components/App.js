// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');
var SkipLinks = require('./SkipLinks');

var IntlMixin = require('../mixins/GrommetIntlMixin');
var Locale = require('../utils/Locale');

var App = React.createClass({
  displayName: 'App',

  propTypes: {
    centered: React.PropTypes.bool
  },

  mixins: [IntlMixin],

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

    //remove this when React 0.14 is released. This is required because context props are not being propagated to children.
    var children = React.Children.map(this.props.children, (function (child) {
      return React.isValidElement(child) ? React.cloneElement(child, this.getChildContext()) : child;
    }).bind(this));

    return React.createElement(
      'div',
      { lang: this.state.lang, className: classes.join(' ') },
      React.createElement(SkipLinks, null),
      children
    );
  }
});

module.exports = App;