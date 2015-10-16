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
      a11yTitleId: 'configuration-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-configuration'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "configuration");

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
        { id: 'configuration' },
        React.createElement('rect', { id: '_x2E_svg_54_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M26.5387,25.7l-8.42,8.42 c-0.58,0.59-1.35,0.88-2.12,0.88c-0.77,0-1.54-0.29-2.12-0.88c-1.17-1.17-1.17-3.07,0-4.24l8.42-8.42c-0.2-0.62-0.3-1.28-0.3-1.96 c0-3.59,2.91-6.5,6.5-6.5c0.8,0,1.56,0.14,2.26,0.41l-4.2,4.2l3.83,3.83l4.2-4.2c0.27,0.7,0.41,1.46,0.41,2.26 c0,3.59-2.91,6.5-6.5,6.5C27.8187,26,27.1587,25.9,26.5387,25.7z' })
      )
    );
  }

});

module.exports = Icon;