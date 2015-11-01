// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var Label = React.createClass({
  displayName: 'Label',

  render: function render() {
    var className = 'status-icon status-icon-label';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 24 24', version: '1.1' },
      React.createElement(
        'g',
        { className: "status-icon__base" },
        React.createElement('circle', { cx: '12', cy: '12', r: '12', stroke: 'none' })
      )
    );
  }

});

module.exports = Label;