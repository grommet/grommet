// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var FormattedMessage = require('../../../components/FormattedMessage');

var CLASS_ROOT = "control-icon";

var Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string,
    colorIndex: React.PropTypes.string,
    large: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      a11yTitleId: 'risk-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-risk'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "risk";
    var a11yTitle = React.createElement(FormattedMessage, { id: titleLabel, defaultMessage: titleLabel });

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
        { id: 'risk' },
        React.createElement('rect', { id: '_x2E_svg_182_', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('rect', { x: '23.5', y: '20.9792', fill: '#231F20', width: '3', height: '3' }),
        React.createElement('rect', { x: '29.5', y: '20.9792', fill: '#231F20', width: '3', height: '3' }),
        React.createElement('rect', { x: '29.5', y: '14.9792', fill: '#231F20', width: '3', height: '3' }),
        React.createElement('rect', { x: '23.5', y: '14.9792', fill: '#231F20', width: '3', height: '3' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M34.5,25.9792h-13v-13h13V25.9792z M20.5,21.9792 h-8v13h13v-8' }),
        React.createElement('rect', { x: '20.5', y: '29.9792', fill: '#231F20', width: '3', height: '3' }),
        React.createElement('rect', { x: '14.5', y: '23.9792', fill: '#231F20', width: '3', height: '3' })
      )
    );
  }

});

module.exports = Icon;