// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var Help = React.createClass({
  displayName: 'Help',

  render: function render() {
    var className = 'control-icon control-icon-help';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 48 48', version: '1.1' },
      React.createElement(
        'g',
        { fill: 'none' },
        React.createElement('path', { strokeWidth: '2', d: 'M17,18c0-4,3.4-7,7-7c3.5,0,7,2.7,7,7s-3.6,7-7,7v6' }),
        React.createElement('line', { strokeWidth: '2', x1: '24', y1: '37', x2: '24', y2: '35' })
      )
    );
  }

});

module.exports = Help;