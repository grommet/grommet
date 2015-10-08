// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');

var Search = React.createClass({
  displayName: 'Search',

  render: function render() {
    var className = 'control-icon control-icon-search';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 48 48', version: '1.1' },
      React.createElement(
        'g',
        { fill: 'none' },
        React.createElement('circle', { strokeWidth: '2', cx: '21.5', cy: '21.5', r: '9' }),
        React.createElement('line', { strokeWidth: '2', x1: '35.5', y1: '35.5', x2: '27.8', y2: '27.8' })
      )
    );
  }

});

module.exports = Search;