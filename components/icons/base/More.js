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
      a11yTitleId: 'more-title'
    };
  },

  render: function render() {
    var className = 'control-icon control-icon-more';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "more");

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
        { id: 'more' },
        React.createElement('rect', { id: '_x2E_svg_3_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('rect', { x: '12', y: '22', fill: '#231F20', width: '4', height: '4' }),
        React.createElement('rect', { x: '22', y: '22', fill: '#231F20', width: '4', height: '4' }),
        React.createElement('rect', { x: '32', y: '22', fill: '#231F20', width: '4', height: '4' })
      )
    );
  }

});

module.exports = Icon;