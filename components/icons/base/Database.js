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
      a11yTitleId: 'database-title'
    };
  },

  render: function render() {
    var className = 'control-icon control-icon-database';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "database");

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
        { id: 'database' },
        React.createElement('rect', { id: '_x2E_svg_50_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('rect', { x: '13', y: '13.5', fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', width: '22', height: '7' }),
        React.createElement('rect', { x: '13', y: '20.5', fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', width: '22', height: '7' }),
        React.createElement('rect', { x: '13', y: '27.5', fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', width: '22', height: '7' }),
        React.createElement('rect', { x: '15', y: '15.5', fill: '#231F20', width: '3', height: '3' }),
        React.createElement('rect', { x: '15', y: '22.5', fill: '#231F20', width: '3', height: '3' }),
        React.createElement('rect', { x: '15', y: '29.5', fill: '#231F20', width: '3', height: '3' })
      )
    );
  }

});

module.exports = Icon;