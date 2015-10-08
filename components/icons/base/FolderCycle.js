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
      a11yTitleId: 'folder-cycle-title'
    };
  },

  render: function render() {
    var className = 'control-icon control-icon-folder-cycle';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "folder-cycle");

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
        { id: 'folder-cycle' },
        React.createElement('rect', { id: '_x2E_svg_202_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M16,35h-3V17l0-4h8l3,4h11v18h-4 M13,21h22' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M19,30c0-2.7614,2.2386-5,5-5 c1.9848,0,3.6994,1.1565,4.5069,2.8323' }),
        React.createElement('polygon', { fill: '#231F20', points: '25,29 30,29 30,24 \t' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M29,30c0,2.7614-2.2386,5-5,5 c-1.9848,0-3.6994-1.1565-4.5069-2.8323' }),
        React.createElement('polygon', { fill: '#231F20', points: '23,31 18,31 18,36 \t' })
      )
    );
  }

});

module.exports = Icon;