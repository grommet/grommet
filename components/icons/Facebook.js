// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var Facebook = React.createClass({
  displayName: 'Facebook',

  render: function render() {
    var className = 'control-icon control-icon-facebook';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 48 48', version: '1.1' },
      React.createElement(
        'g',
        { stroke: 'none' },
        React.createElement('path', { d: 'M26.1,35.9 L26.1,24.9 L29.8,24.9 L30.3,20.6 L26.1,20.6 L26.1,17.9 C26.1,16.7 26.4,15.8 28.2,15.8 L30.5,15.8 L30.5,12 C30.1,11.9 28.8,11.8 27.2,11.8 C23.9,11.8 21.7,13.8 21.7,17.4 L21.7,20.5 L18,20.5 L18,24.8 L21.7,24.8 L21.7,35.7 L26.1,35.7 L26.1,35.9 Z' })
      )
    );
  }

});

module.exports = Facebook;