// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var Person = React.createClass({
  displayName: 'Person',

  propTypes: {
    onClick: React.PropTypes.func
  },

  render: function render() {
    var className = 'control-icon control-icon-person';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 48 48', version: '1.1',
        onClick: this.props.onClick },
      React.createElement(
        'g',
        { fill: 'none', strokeWidth: '2' },
        React.createElement('circle', { cx: '24', cy: '18', r: '5' }),
        React.createElement('path', { d: 'M33,36 L33,31 C33,26.6 29.4,23 25,23 L23,23 C18.6,23 15,26.6 15,31 L15,36' }),
        React.createElement('path', { d: 'M20,36 L20,31' }),
        React.createElement('path', { d: 'M28,36 L28,31' })
      )
    );
  }

});

module.exports = Person;