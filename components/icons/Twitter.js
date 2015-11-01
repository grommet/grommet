// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var Twitter = React.createClass({
  displayName: 'Twitter',

  render: function render() {
    var className = 'control-icon control-icon-twitter';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 48 48', version: '1.1' },
      React.createElement(
        'g',
        { stroke: 'none' },
        React.createElement('path', { d: 'M36,16.8 C35.1,17.2 34.2,17.5 33.2,17.6 C34.2,17 35,16 35.4,14.9 C34.4,15.5 33.4,15.9 32.3,16.1 C31.4,15.1 30.1,14.5 28.7,14.5 C26,14.5 23.8,16.7 23.8,19.4 C23.8,19.8 23.8,20.2 23.9,20.5 C19.8,20.3 16.2,18.3 13.8,15.4 C13.2,16.1 13,17 13,17.9 C13,19.6 13.9,21.1 15.2,22 C14.4,22 13.6,21.8 13,21.4 C13,21.4 13,21.4 13,21.5 C13,23.9 14.7,25.9 16.9,26.3 C16.5,26.4 16.1,26.5 15.6,26.5 C15.3,26.5 15,26.5 14.7,26.4 C15.3,28.4 17.1,29.8 19.3,29.8 C17.6,31.1 15.5,31.9 13.2,31.9 C12.8,31.9 12.4,31.9 12,31.8 C14.2,33.2 16.8,34 19.5,34 C28.6,34 33.5,26.5 33.5,20 L33.5,19.4 C34.5,18.7 35.3,17.8 36,16.8 L36,16.8 Z' })
      )
    );
  }

});

module.exports = Twitter;