// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var DragHandle = React.createClass({
  displayName: 'DragHandle',

  render: function render() {
    var className = 'control-icon control-icon-drag-handle';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 48 48', version: '1.1' },
      React.createElement(
        'g',
        { stroke: 'none', strokeWidth: '1', fill: '#cccccc', fillRule: 'evenodd' },
        React.createElement('rect', { x: '12', y: '12', width: '3', height: '3' }),
        React.createElement('rect', { x: '18', y: '12', width: '3', height: '3' }),
        React.createElement('rect', { x: '12', y: '18', width: '3', height: '3' }),
        React.createElement('rect', { x: '18', y: '18', width: '3', height: '3' }),
        React.createElement('rect', { x: '12', y: '24', width: '3', height: '3' }),
        React.createElement('rect', { x: '18', y: '24', width: '3', height: '3' }),
        React.createElement('rect', { x: '12', y: '30', width: '3', height: '3' }),
        React.createElement('rect', { x: '18', y: '30', width: '3', height: '3' })
      )
    );
  }

});

module.exports = DragHandle;