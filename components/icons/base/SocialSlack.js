// (C) Copyright 2014-2015 Hewlett-Packard Development Company

'use strict';

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string
  },

  mixins: [IntlMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      a11yTitleId: 'social-slack-title'
    };
  },

  render: function render() {
    var className = 'control-icon control-icon-social-slack';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "social-slack");

    return React.createElement(
      'svg',
      { version: '1.1', viewBox: '0 0 48 48', width: '48px', height: '48px', className: className, 'aria-labelledby': this.props.a11yTitleId },
      React.createElement(
        'title',
        { id: this.props.a11yTitleId },
        a11yTitle
      ),
      React.createElement(
        'g',
        { id: 'social-slack' },
        React.createElement('rect', { id: '_x2E_svg_281_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { d: 'M33.1667,26.6344h-2.75v-5.5h2.75c1.0126,0,1.8333-0.8209,1.8333-1.8333s-0.8208-1.8333-1.8333-1.8333h-2.75v-2.75 c0-1.0125-0.8208-1.8333-1.8333-1.8333c-1.0125,0-1.8333,0.8209-1.8333,1.8333v2.75h-5.5v-2.75 c0-1.0125-0.8208-1.8333-1.8333-1.8333c-1.0125,0-1.8333,0.8209-1.8333,1.8333v2.75h-2.75c-1.0125,0-1.8333,0.8209-1.8333,1.8333 s0.8208,1.8333,1.8333,1.8333h2.75v5.5h-2.75c-1.0125,0-1.8333,0.8209-1.8333,1.8333s0.8208,1.8333,1.8333,1.8333h2.75v2.75 c0,1.0125,0.8208,1.8333,1.8333,1.8333c1.0126,0,1.8333-0.8209,1.8333-1.8333v-2.75h5.5v2.75c0,1.0125,0.8208,1.8333,1.8333,1.8333 c1.0126,0,1.8333-0.8209,1.8333-1.8333v-2.75h2.75c1.0126,0,1.8333-0.8209,1.8333-1.8333S34.1792,26.6344,33.1667,26.6344z M21.25,26.6344v-5.5h5.5v5.5H21.25z' })
      )
    );
  }

});

module.exports = Icon;