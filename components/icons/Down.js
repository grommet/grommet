// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var Down = React.createClass({
  displayName: 'Down',

  render: function render() {
    var className = 'control-icon control-icon-down';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 48 48', version: '1.1' },
      React.createElement(
        'g',
        { fill: 'none' },
        React.createElement('polyline', { strokeWidth: '2', points: '34,27.1 24,35 14,27 ' }),
        React.createElement('path', { strokeWidth: '2', d: 'M24,34.7C24,12,24,12,24,12' })
      )
    );
  }

});

module.exports = Down;