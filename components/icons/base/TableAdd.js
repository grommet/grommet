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
      a11yTitleId: 'table-add-title'
    };
  },

  render: function render() {
    var className = 'control-icon control-icon-table-add';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "table-add");

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
        { id: 'table-add' },
        React.createElement('rect', { id: '_x2E_svg_227_', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M38,29c0,3.866-3.134,7-7,7s-7-3.134-7-7 s3.134-7,7-7S38,25.134,38,29z M34,13H13v4h21V13z M34,23v-6H20h-7v18h7h7 M20,17v18 M27,18v5l0,0 M27,36v-1v-0.26 M27,23L27,23H14 M14,29h10 M34,27 M34,27 M35,29h-8 M31,33v-8' })
      )
    );
  }

});

module.exports = Icon;