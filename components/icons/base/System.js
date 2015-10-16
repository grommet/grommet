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
      a11yTitleId: 'system-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-system'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "system");

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
        { id: 'system' },
        React.createElement('rect', { id: '_x2E_svg_106_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M35,31H13V13h22V31z M24,19c-1.6569,0-3,1.3431-3,3 c0,1.6569,1.3431,3,3,3c1.6569,0,3-1.3431,3-3C27,20.3431,25.6568,19,24,19z M24,19v-3 M28.2426,17.7574l-2.1213,2.1213 M30,22h-3 M26.1213,24.1213l2.1213,2.1213 M24,25v3 M21.8787,24.1213l-2.1213,2.1213 M21,22h-3 M19.7574,17.7574l2.1213,2.1213 M28,22 M26.8284,24.8284 M24,28 M24,26 M21.1716,24.8284 M18,22 M20,22 M28,31h-8v4h8V31z M17,35h14' })
      )
    );
  }

});

module.exports = Icon;