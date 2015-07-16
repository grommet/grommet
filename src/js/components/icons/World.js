// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var World = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-world';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fill="none" strokeWidth="2">
          <circle cx="24" cy="24" r="12"></circle>
          <ellipse cx="24" cy="24" rx="5.5" ry="12"></ellipse>
          <path d="M13.1,19.6 L34.9,19.6"></path>
          <path d="M13.1,28.4 L34.9,28.4"></path>
        </g>
      </svg>
    );
  }

});

module.exports = World;
