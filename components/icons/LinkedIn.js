// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var LinkedIn = React.createClass({
  displayName: 'LinkedIn',

  render: function render() {
    var className = 'control-icon control-icon-linked-in';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 48 48', version: '1.1' },
      React.createElement(
        'g',
        { stroke: 'none' },
        React.createElement('path', { d: 'M17.4,36 L12.4,36 L12.4,20 L17.4,20 L17.4,36 L17.4,36 Z M14.9,17.8 C13.3,17.8 12,16.5 12,14.9 C12,13.3 13.3,12 14.9,12 C16.5,12 17.8,13.3 17.8,14.9 C17.8,16.5 16.5,17.8 14.9,17.8 L14.9,17.8 Z M36,36 L31,36 L31,28.2 C31,26.3 31,24 28.4,24 C25.8,24 25.4,26 25.4,28.1 L25.4,36 L20.4,36 L20.4,20 L25.2,20 L25.2,22.2 L25.3,22.2 C26,20.9 27.6,19.6 30,19.6 C35,19.6 36,22.9 36,27.2 L36,36 L36,36 Z' })
      )
    );
  }

});

module.exports = LinkedIn;