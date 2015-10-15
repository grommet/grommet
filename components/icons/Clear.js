// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');

var Clear = React.createClass({
  displayName: 'Clear',

  render: function render() {
    var className = 'control-icon control-icon-clear';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 48 48', version: '1.1' },
      React.createElement(
        'g',
        { fill: 'none' },
        React.createElement('line', { strokeWidth: '2', x1: '14', y1: '14', x2: '34', y2: '34' }),
        React.createElement('line', { strokeWidth: '2', x1: '14', y1: '34', x2: '34', y2: '14' })
      )
    );
  }

});

module.exports = Clear;