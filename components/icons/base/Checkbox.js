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
      a11yTitleId: 'checkbox-title'
    };
  },

  render: function render() {
    var className = 'control-icon control-icon-checkbox';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "checkbox");

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
        { id: 'checkbox' },
        React.createElement('rect', { id: '_x2E_svg_38_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('rect', { x: '14', y: '14', fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', width: '20', height: '20' })
      )
    );
  }

});

module.exports = Icon;