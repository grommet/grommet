// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var Mail = React.createClass({
  displayName: 'Mail',

  render: function render() {
    var className = 'control-icon control-icon-mail';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 48 48', version: '1.1' },
      React.createElement(
        'g',
        { fill: 'none', strokeWidth: '2' },
        React.createElement('rect', { x: '12', y: '14', width: '24', height: '19.6' }),
        React.createElement('path', { d: 'M12,17.3 L24,27.1 L36,17.3' }),
        React.createElement('path', { d: 'M12.2,32.3 L20.7,23.8' }),
        React.createElement('path', { d: 'M35.8,32.3 L27.3,23.8' })
      )
    );
  }

});

module.exports = Mail;