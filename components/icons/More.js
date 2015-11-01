// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var More = React.createClass({
  displayName: 'More',

  render: function render() {
    var className = 'control-icon control-icon-more';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 48 48', version: '1.1' },
      React.createElement(
        'g',
        { fill: 'none' },
        React.createElement('rect', { x: '23', y: '23', strokeWidth: '2', width: '2', height: '2' }),
        React.createElement('rect', { x: '15', y: '23', strokeWidth: '2', width: '2', height: '2' }),
        React.createElement('rect', { x: '31', y: '23', strokeWidth: '2', width: '2', height: '2' })
      )
    );
  }

});

module.exports = More;