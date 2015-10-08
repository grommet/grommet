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
      a11yTitleId: 'support-title'
    };
  },

  render: function render() {
    var className = 'control-icon control-icon-support';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "support");

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
        { id: 'support' },
        React.createElement('rect', { id: '_x2E_svg_95_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M35,24.15c0,6.0751-4.9249,11-11,11 s-11-4.9249-11-11s4.9249-11,11-11S35,18.0749,35,24.15z M29,24.15c0-2.7568-2.2432-5-5-5s-5,2.2432-5,5s2.2432,5,5,5 S29,26.9068,29,24.15z M21,20.15v-6 M27,20.15v-6 M28,21.15h6 M28,27.15h6 M27,28.15v6 M21,28.15v6 M20,27.15h-6 M20,21.15h-6' })
      )
    );
  }

});

module.exports = Icon;