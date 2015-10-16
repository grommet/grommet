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
      a11yTitleId: 'fan-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-fan'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "fan");

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
        { id: 'fan' },
        React.createElement('rect', { id: '_x2E_svg_203_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeLinecap: 'round', strokeMiterlimit: '10', d: 'M24.0004,29 c-2.2061,0-4-1.7944-4-4s1.7939-4,4-4s4,1.7944,4,4S26.2064,29,24.0004,29z M26.7404,22.09c0.5-1.82,1.01-3.64,1.51-5.46 c0.32-1.15-0.46-2.31-1.73-2.6c-0.7-0.17-1.51-0.28-2.42-0.29c-1.03-0.01-1.96,0.12-2.73,0.32c-1.22,0.29-1.93,1.45-1.62,2.57 l1.51,5.46 M25.1304,28.84c1.33,1.35,2.68,2.72,4.02,4.08c0.84,0.85,2.24,0.76,3.13-0.2c0.49-0.52,1-1.17,1.46-1.95 c0.52-0.89,0.86-1.76,1.09-2.52c0.35-1.21-0.31-2.4-1.43-2.69l-5.5-1.43 M20.1004,24.13c-1.83,0.47-3.66,0.95-5.5,1.42 c-1.16,0.31-1.78,1.56-1.4,2.82c0.21,0.68,0.52,1.44,0.96,2.23c0.51,0.9,1.09,1.63,1.64,2.2c0.88,0.92,2.23,0.95,3.04,0.12 l4.03-4.08' })
      )
    );
  }

});

module.exports = Icon;