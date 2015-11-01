// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var SearchPlus = React.createClass({
  displayName: 'SearchPlus',

  render: function render() {
    var className = 'control-icon control-icon-search-plus';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 48 48', version: '1.1' },
      React.createElement(
        'g',
        { strokeWidth: '4', fill: 'none', fillRule: 'evenodd' },
        React.createElement('circle', { strokeWidth: '4', cx: '21', cy: '21', r: '7' }),
        React.createElement('path', { d: 'M27.2,27 L34.2,36', strokeWidth: '4', strokeLinecap: 'round' }),
        React.createElement('path', { d: 'M34,13 L34,19', strokeWidth: '2', strokeLinecap: 'round' }),
        React.createElement('path', { d: 'M37,16 L31,16', strokeWidth: '2', strokeLinecap: 'round' })
      )
    );
  }

});

module.exports = SearchPlus;