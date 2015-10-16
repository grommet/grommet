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
      a11yTitleId: 'user-manager-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-user-manager'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "user-manager");

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
        { id: 'user-manager' },
        React.createElement('rect', { id: '_x2E_svg_134_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M27.575,23.83c0.79,0.39,1.5,0.9,2.11,1.51 c1.44,1.45,2.34,3.45,2.34,5.66v4h-16v-4c0-3.14,1.81-5.86,4.45-7.17 M24.025,13c-3.3137,0-6,2.6863-6,6s2.6863,6,6,6s6-2.6863,6-6 S27.3387,13,24.025,13z M29.935,20c-2.05-0.03-3.86-1.09-4.91-2.69c-1.07,1.62-2.91,2.69-5,2.69c-0.69,0-1.35-0.11-1.96-0.33 M19.025,25l5,6v4l0,0v-4l5-6' })
      )
    );
  }

});

module.exports = Icon;