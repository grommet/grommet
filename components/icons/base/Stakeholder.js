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
      a11yTitleId: 'stakeholder-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-stakeholder'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "stakeholder";
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
        { id: 'stakeholder' },
        React.createElement('rect', { id: '_x2E_svg_155_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M26.5,16l6-2.9545L38.5,16v7.0909l-6,2.9545 l-6-2.9545V16z M26.5,16l6,2.9545L38.5,16 M32.5,19.0455v7 M18.5,24.0455c0,0,0.04,0,0.02,0c-3.23,0.03-6.02,2.66-6.02,5.89v2.11h3 M14.5,32.0455h10v-2.11c0-3.23-2.76-5.86-5.98-5.89c-0.02,0-0.02,0-0.02,0 M18.5,16.0455c-2.2091,0-4,1.7909-4,4s1.7909,4,4,4 s4-1.7909,4-4S20.7091,16.0455,18.5,16.0455z' })
      )
    );
  }

});

module.exports = Icon;