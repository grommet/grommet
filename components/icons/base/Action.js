// (C) Copyright 2014-2015 Hewlett-Packard Development Company

'use strict';

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var CLASS_ROOT = "control-icon";

var Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string,
    colorIndex: React.PropTypes.string,
    large: React.PropTypes.bool
  },

  mixins: [IntlMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      a11yTitleId: 'action-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-action'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "action");

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
        { id: 'action' },
        React.createElement('rect', { id: '_x2E_svg_82_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M16.3088,32.1644l-0.5364-0.5391 c-2.3631-2.3748-2.3631-6.2608,0-8.6356L16.7573,22L26,31.2883l-0.8719,0.8762C22.6928,34.6119,18.7442,34.6119,16.3088,32.1644z M22.8719,15.8356L22,16.7117L31.2427,26l0.9849-0.9898c2.3631-2.3748,2.3631-6.2608,0-8.6356l-0.5364-0.5391 C29.2559,13.3881,25.3073,13.3881,22.8719,15.8356z M25.71,26.54l3.04-3.04 M21.46,22.29l3.05-3.05 M31.9279,16.0722L35,13 M13,35 l3.0722-3.0722' })
      )
    );
  }

});

module.exports = Icon;