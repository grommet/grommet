// (C) Copyright 2014-2015 Hewlett-Packard Development Company

'use strict';

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var CLASS_ROOT = "control-icon";

var Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string,
    colorIndex: React.PropTypes.string,
    large: React.PropTypes.bool
  },

  mixins: [IntlMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      a11yTitleId: 'platform-dropbox-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-platform-dropbox'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "platform-dropbox");

    return React.createElement(
      'svg',
      { version: '1.1', viewBox: '0 0 48 48', width: '48px', height: '48px', className: classes.join(' '), 'aria-labelledby': this.props.a11yTitleId },
      React.createElement(
        'title',
        { id: this.props.a11yTitleId },
        a11yTitle
      ),
      React.createElement(
        'g',
        { id: 'platform-dropbox' },
        React.createElement('rect', { id: '_x2E_svg_295_', fill: 'none', width: '48', height: '48' }),
        React.createElement('polygon', { points: '27.9955,13.8917 24,15.8961 32.006,19.8976 35.997,17.8961 \t' }),
        React.createElement('polygon', { points: '27.9955,27.5735 27.3264,27.2404 23.991,25.5675 20.6751,27.23 20.006,27.5646 19.3383,27.2315 15.994,25.5601  15.994,30.997 24,35.0014 24,34.9865 32.006,30.9865 32.006,25.569 28.6647,27.2404 \t' }),
        React.createElement('polygon', { points: '20.006,25.8947 24,23.8917 16.0149,19.8976 24,15.9066 20.006,13.9036 11.997,17.9051 15.9746,19.8976  11.997,21.8902 \t' }),
        React.createElement('polygon', { points: '24,23.9021 27.9955,25.9036 35.997,21.9021 32.006,19.8976 \t' })
      )
    );
  }

});

module.exports = Icon;