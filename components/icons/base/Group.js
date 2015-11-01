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
      a11yTitleId: 'group-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-group'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "group";
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
        { id: 'group' },
        React.createElement('rect', { id: '_x2E_svg_119_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M28,20.5c0,2.2091-1.7909,4-4,4s-4-1.7909-4-4 s1.7909-4,4-4S28,18.2909,28,20.5z M30,30.4091C30,26.995,27.3687,24.5,23.9546,24.5h0.1364C20.6768,24.5,18,26.995,18,30.4091 V33.5h12V30.4091z M27.96,20.93c0.01,0,0.01,0.01,0.02,0.01c0.58,0.35,1.26,0.55,1.97,0.56c0.02,0,0.03,0,0.05,0c2.21,0,4-1.79,4-4 s-1.79-4-4-4c-2.06,0-3.76,1.56-3.97,3.56 M30,30.5h6v-3.0909C36,23.995,33.3687,21.5,29.9546,21.5H30 M21.97,17.06 c-0.21-2-1.91-3.56-3.97-3.56c-2.21,0-4,1.79-4,4s1.79,4,4,4c0.02,0,0.03,0,0.05,0c0.71-0.01,1.39-0.21,1.97-0.56 c0.01,0,0.01-0.01,0.02-0.01 M18,21.5h0.0454C14.6313,21.5,12,23.995,12,27.4091V30.5h6' })
      )
    );
  }

});

module.exports = Icon;