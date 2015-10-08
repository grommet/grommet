// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');

var Edit = React.createClass({
  displayName: 'Edit',

  render: function render() {
    var className = 'control-icon control-icon-edit';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 48 48', version: '1.1' },
      React.createElement(
        'g',
        { fill: 'none' },
        React.createElement('circle', { strokeWidth: '2', cx: '24', cy: '24', r: '9' }),
        React.createElement('line', { strokeWidth: '2', x1: '24', y1: '11', x2: '24', y2: '15' }),
        React.createElement('line', { strokeWidth: '2', x1: '33.2', y1: '14.8', x2: '30.3', y2: '17.6' }),
        React.createElement('line', { strokeWidth: '2', x1: '37', y1: '24', x2: '33', y2: '24' }),
        React.createElement('line', { strokeWidth: '2', x1: '33.2', y1: '33.2', x2: '30.3', y2: '30.4' }),
        React.createElement('line', { strokeWidth: '2', x1: '24', y1: '37', x2: '24', y2: '33' }),
        React.createElement('line', { strokeWidth: '2', x1: '14.8', y1: '33.2', x2: '17.7', y2: '30.4' }),
        React.createElement('line', { strokeWidth: '2', x1: '11', y1: '24', x2: '15.2', y2: '24' }),
        React.createElement('line', { strokeWidth: '2', x1: '14.8', y1: '14.8', x2: '17.7', y2: '17.6' })
      )
    );
  }

});

module.exports = Edit;