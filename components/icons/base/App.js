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
      a11yTitleId: 'app-title'
    };
  },

  render: function render() {
    var className = 'control-icon control-icon-app';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "app");

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
        { id: 'app' },
        React.createElement('rect', { id: '_x2E_svg_4_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: '#231F20', d: 'M18,18h-4v-4h4V18z M26,14h-4v4h4V14z M34,14h-4v4h4V14z M18,22h-4v4h4V22z M26,22h-4v4h4V22z M34,22h-4v4 h4V22z M18,30h-4v4h4V30z M26,30h-4v4h4V30z M34,30h-4v4h4V30z' })
      )
    );
  }

});

module.exports = Icon;