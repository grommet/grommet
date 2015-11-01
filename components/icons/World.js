// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var World = React.createClass({
  displayName: 'World',

  render: function render() {
    var className = 'control-icon control-icon-world';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 48 48', version: '1.1' },
      React.createElement(
        'g',
        { fill: 'none', strokeWidth: '2' },
        React.createElement('circle', { cx: '24', cy: '24', r: '12' }),
        React.createElement('ellipse', { cx: '24', cy: '24', rx: '5.5', ry: '12' }),
        React.createElement('path', { d: 'M13.1,19.6 L34.9,19.6' }),
        React.createElement('path', { d: 'M13.1,28.4 L34.9,28.4' })
      )
    );
  }

});

module.exports = World;