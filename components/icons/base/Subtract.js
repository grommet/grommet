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
      a11yTitleId: 'subtract-title'
    };
  },

  render: function render() {
    var className = 'control-icon control-icon-subtract';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "subtract");

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
        { id: 'subtract_1_' },
        React.createElement('rect', { id: '_x2E_svg_10_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('line', { id: 'subtract', fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', x1: '12', y1: '24', x2: '36', y2: '24' })
      )
    );
  }

});

module.exports = Icon;