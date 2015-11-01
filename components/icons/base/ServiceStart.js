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
      a11yTitleId: 'service-start-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-service-start'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "service-start";
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
        { id: 'service-start' },
        React.createElement('rect', { id: '_x2E_svg_215_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: '#231F20', d: 'M18,17.5c0.0521,0.0469,0,6,0,6l5-3L18,17.5z' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M23.28,24.3c0.01,0,0.02,0,0.03,0.01 c0.03,0.01,0.06,0.04,0.09,0.06c0.02,0.02,0.05,0.04,0.07,0.05c1.55,0.51,2.79,1.48,3.36,3.31c0.03,0.08,0.05,0.18,0.08,0.27h0.01 c0.18,0,0.28,1.01,0.28,1.62c0,3.04-2.46,5.38-5.5,5.38s-5.5-2.46-5.5-5.5c0-1.48,0.58-2.82,1.53-3.8 M24.65,18.5799 C23.88,16.49,21.86,15,19.5,15c-3.04,0-5.5,2.46-5.5,5.5c0,2.42,1.56,4.47,3.73,5.2c0.55,0.2,1.15,0.3,1.77,0.3 c1.5,0,2.86-0.6,3.85-1.58c0.02-0.01,0.04-0.03,0.05-0.05c0.99-0.99,1.6-2.36,1.6-3.87C25,19.82,24.88,19.17,24.65,18.5799z M23.28,24.24c0.01,0.02,0.02,0.05,0.03,0.07c0.01,0.04,0.02,0.07,0.04,0.11 M26.83,27.73c0.03,0.01,0.06,0.02,0.09,0.03 c0.5,0.16,1.03,0.24,1.58,0.24c3.04,0,5.5-2.46,5.5-5.5S31.54,17,28.5,17c-1.5,0-2.86,0.6-3.85,1.58' })
      )
    );
  }

});

module.exports = Icon;