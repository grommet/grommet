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
      a11yTitleId: 'user-police-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-user-police'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "user-police";
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
        { id: 'user-police' },
        React.createElement('rect', { id: '_x2E_svg_135_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M30,21v0.5714C30,25.1218,27.5504,28,24,28 s-6-2.8782-6-6.4286V21 M20.45,26.83C17.81,28.14,16,30.86,16,34v1h16v-1c0-2.21-0.9-4.21-2.34-5.66 c-0.61-0.61-1.32-1.12-2.11-1.51 M33,17.3322C31.2226,14.7422,27.8652,13,24,13s-7.2226,1.7422-9,4.3322L17.4169,20H24h6.5831 L33,17.3322z' }),
        React.createElement('path', { fill: '#231F20', d: 'M24,15h-2c0,0-0.0625,3,2,3c2,0,1.9998-3,1.9998-3H24z' })
      )
    );
  }

});

module.exports = Icon;