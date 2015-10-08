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
      a11yTitleId: 'srive-cage-title'
    };
  },

  render: function render() {
    var className = 'control-icon control-icon-srive-cage';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "srive-cage");

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
        { id: 'srive-cage' },
        React.createElement('rect', { id: '_x2E_svg_205_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('rect', { x: '30', y: '16', fill: '#231F20', width: '2', height: '2' }),
        React.createElement('rect', { x: '30', y: '22', fill: '#231F20', width: '2', height: '2' }),
        React.createElement('rect', { x: '30', y: '28', fill: '#231F20', width: '2', height: '2' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M35,32H13V14h22V32z M14,20h20 M16,17h13 M14,26h20 M16,23h13 M16,29h13 M13,14v21 M35,14v21' })
      )
    );
  }

});

module.exports = Icon;