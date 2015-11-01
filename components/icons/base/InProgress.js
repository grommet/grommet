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
      a11yTitleId: 'in-progress-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-in-progress'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "in-progress";
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
        { id: 'in-progress' },
        React.createElement('rect', { id: '_x2E_svg_216_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M35.0002,36h-6.17h-9.75h-6.08h3.8896 c-3.625-8.125,5.1104-8.0208,5.1104-11c0-3-8.625-2.875-5-11h-4h22h-3.8896c3.625,8.125-5.1104,8.0208-5.1104,11 c0,3,8.625,2.875,5,11' }),
        React.createElement('path', { fill: '#231F20', d: 'M28.8302,36h-9.75c-0.31-1.54,0.23-2.4399,2.27-4.3201c0.78-0.72,1.79-1.53,2.7-2.76 c0.91,1.23,1.9,2.0701,2.68,2.8C28.8402,33.6899,29.3102,33.97,28.8302,36z' }),
        React.createElement('path', { fill: '#231F20', d: 'M21.4466,19c-0.714,1.2603-0.6832,1.2753,0.9183,2.0747c0.4669,0.2328,1.0602,0.5291,1.6027,0.9253 c0.5494-0.3968,1.1516-0.6931,1.6247-0.9265c1.6734-0.8236,1.6602-0.8467,0.9653-2.0735' })
      )
    );
  }

});

module.exports = Icon;