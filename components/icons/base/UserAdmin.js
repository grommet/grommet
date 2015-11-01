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
      a11yTitleId: 'user-admin-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-user-admin'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "user-admin";
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
        { id: 'user-admin' },
        React.createElement('rect', { id: '_x2E_svg_132_', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M25.9991,18c0,2.7614-2.2386,5-5,5s-5-2.2386-5-5 s2.2386-5,5-5S25.9991,15.2386,25.9991,18z M23.9991,32.5c0,1.3807,1.1193,2.5,2.5,2.5s2.5-1.1193,2.5-2.5 c0-1.3807-1.1193-2.5-2.5-2.5S23.9991,31.1193,23.9991,32.5z M36.9991,28l-3-3l-5.5312,5.5312 M31.4991,27.5l3,3 M20.9991,23 L20.9991,23c-4.4183,0-8,3.5817-8,8v4h8 M27.0009,25.7104C25.535,24.0484,23.3895,23,20.9991,23h0' })
      )
    );
  }

});

module.exports = Icon;