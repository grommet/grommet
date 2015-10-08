// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');

var Calendar = React.createClass({
  displayName: 'Calendar',

  render: function render() {
    var className = 'control-icon control-icon-calendar';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 48 48', version: '1.1' },
      React.createElement(
        'g',
        { fill: 'none', strokeWidth: '2' },
        React.createElement('rect', { x: '13', y: '16', width: '22', height: '20' }),
        React.createElement('path', { d: 'M17,16 L17,13' }),
        React.createElement('path', { d: 'M31,16 L31,13' }),
        React.createElement('path', { d: 'M13,23 L35,23' })
      ),
      React.createElement(
        'g',
        { stroke: 'none' },
        React.createElement('rect', { x: '29', y: '30', width: '3', height: '3' })
      )
    );
  }

});

module.exports = Calendar;