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
      a11yTitleId: 'servers-title'
    };
  },

  render: function render() {
    var className = 'control-icon control-icon-servers';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "servers");

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
        { id: 'servers' },
        React.createElement('rect', { id: '_x2E_svg_184_', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('rect', { x: '19', y: '29.9792', fill: '#231F20', width: '2', height: '2' }),
        React.createElement('rect', { x: '30', y: '29.9792', fill: '#231F20', width: '2', height: '2' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M24,34.9792H13v-22h11V34.9792z M16,16.9792h5 M16,20.9792h5 M16,24.9792h5 M35,12.9792H24v22h11V12.9792z M27,16.9792h5 M27,20.9792h5 M27,24.9792h5' })
      )
    );
  }

});

module.exports = Icon;