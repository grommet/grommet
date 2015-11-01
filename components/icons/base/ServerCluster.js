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
      a11yTitleId: 'server-cluster-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-server-cluster'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "server-cluster";
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
        { id: 'server-cluster' },
        React.createElement('rect', { id: '_x2E_svg_174_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M35,20.34H13v-7h22V20.34z M35,20.34H13v7h22V20.34 z M35,27.34H13v7h22V27.34z' }),
        React.createElement('rect', { x: '25', y: '15.34', fill: '#231F20', width: '2', height: '3' }),
        React.createElement('rect', { x: '28', y: '15.34', fill: '#231F20', width: '2', height: '3' }),
        React.createElement('rect', { x: '31', y: '15.34', fill: '#231F20', width: '2', height: '3' }),
        React.createElement('rect', { x: '25', y: '22.34', fill: '#231F20', width: '2', height: '3' }),
        React.createElement('rect', { x: '28', y: '22.34', fill: '#231F20', width: '2', height: '3' }),
        React.createElement('rect', { x: '31', y: '22.34', fill: '#231F20', width: '2', height: '3' }),
        React.createElement('rect', { x: '25', y: '29.34', fill: '#231F20', width: '2', height: '3' }),
        React.createElement('rect', { x: '28', y: '29.34', fill: '#231F20', width: '2', height: '3' }),
        React.createElement('rect', { x: '31', y: '29.34', fill: '#231F20', width: '2', height: '3' })
      )
    );
  }

});

module.exports = Icon;