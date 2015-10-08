// (C) Copyright 2014-2015 Hewlett-Packard Development Company

'use strict';

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string
  },

  mixins: [IntlMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      a11yTitleId: 'dashboard-title'
    };
  },

  render: function render() {
    var className = 'control-icon control-icon-dashboard';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "dashboard");

    return React.createElement(
      'svg',
      { version: '1.1', viewBox: '0 0 48 48', width: '48px', height: '48px', className: className, 'aria-labelledby': this.props.a11yTitleId },
      React.createElement(
        'title',
        { id: this.props.a11yTitleId },
        a11yTitle
      ),
      React.createElement(
        'g',
        { id: 'dashboard' },
        React.createElement('rect', { id: '_x2E_svg_51_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M35,24.5c0,6.0751-4.9249,11-11,11 s-11-4.9249-11-11s4.9249-11,11-11S35,18.4249,35,24.5z M14,28.5h20 M27,27.5c0-1.6569-1.3431-3-3-3c-1.6569,0-3,1.3431-3,3 M24,24.5v-6 M24,16.5v-2 M29.6568,18.8431l1.4142-1.4142 M32,24.5h2 M18,18.8431l-1.4142-1.4142 M16,24.5h-2' })
      )
    );
  }

});

module.exports = Icon;