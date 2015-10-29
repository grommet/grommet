// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');

var Up = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-up';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fill="none">
          <polyline strokeWidth="2" points="14,20.9 24,13 34,21 "/>
          <path strokeWidth="2" d="M24,13.3C24,36,24,36,24,36"/>
        </g>
      </svg>
    );
  }

});

module.exports = Up;
