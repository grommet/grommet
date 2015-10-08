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
      a11yTitleId: 'document-data-title'
    };
  },

  render: function render() {
    var className = 'control-icon control-icon-document-data';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "document-data");

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
        { id: 'document-data' },
        React.createElement('rect', { id: '_x2E_svg_232_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M15,19v-6h13.0002L33,17.9999V35h-5 M27,14v5h6 M19,22c-3.3137,0-6,1.1193-6,2.5s2.6863,2.5,6,2.5s6-1.1193,6-2.5S22.3137,22,19,22z M13,25v3.5c0,1.3807,2.6863,2.5,6,2.5 s6-1.1193,6-2.5V25 M13,29v3.5c0,1.3807,2.6863,2.5,6,2.5s6-1.1193,6-2.5V29' })
      )
    );
  }

});

module.exports = Icon;