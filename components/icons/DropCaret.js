// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');

var DropCaret = React.createClass({
  displayName: 'DropCaret',

  render: function render() {
    var className = 'control-icon control-icon-drop-caret';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 48 48', version: '1.1' },
      React.createElement(
        'g',
        { fill: 'none' },
        React.createElement('polyline', { strokeWidth: '2', strokeMiterlimit: '10', points: '34,19 24,29 14,19 ' })
      )
    );
  }

});

module.exports = DropCaret;