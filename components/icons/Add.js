// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');

var Add = React.createClass({
  displayName: 'Add',

  propTypes: {
    onClick: React.PropTypes.func
  },

  render: function render() {
    var className = 'control-icon control-icon-add';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 48 48', version: '1.1',
        onClick: this.props.onClick },
      React.createElement(
        'g',
        { fill: 'none' },
        React.createElement('line', { strokeWidth: '2', x1: '24', y1: '14', x2: '24', y2: '34' }),
        React.createElement('line', { strokeWidth: '2', x1: '14', y1: '24', x2: '34', y2: '24' })
      )
    );
  }

});

module.exports = Add;