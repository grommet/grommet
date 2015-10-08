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
      a11yTitleId: 'language-title'
    };
  },

  render: function render() {
    var className = 'control-icon control-icon-language';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "language");

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
        { id: 'language' },
        React.createElement('rect', { id: '_x2E_svg_30_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M35,24c0,6.0751-4.9249,11-11,11s-11-4.9249-11-11 s4.9249-11,11-11S35,17.9249,35,24z M24,13c-2.2091,0-4,4.9249-4,11s1.7909,11,4,11s4-4.9249,4-11S26.2091,13,24,13z M14,20h20 M14,28h20' })
      )
    );
  }

});

module.exports = Icon;