// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var Right = React.createClass({
  displayName: 'Right',

  render: function render() {
    var className = 'control-icon control-icon-right';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 48 48', version: '1.1' },
      React.createElement(
        'g',
        { fill: 'none' },
        React.createElement('polyline', { strokeWidth: '2', points: '27.1,14 35,24 27,34' }),
        React.createElement('path', { strokeWidth: '2', d: 'M34.7,24C12,24,12,24,12,24' })
      )
    );
  }

});

module.exports = Right;