// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Edit = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-edit';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fill="none" fill-rule="evenodd">
          <circle strokeWidth="4" cx="24" cy="24" r="7"></circle>
          <g strokeWidth="3" strokeLinecap="round">
            <path d="M24,13.5 L24,17.5"></path>
            <path d="M24,30.5 L24,34.5"></path>
            <path d="M30.5,24 L34.5,24"></path>
            <path d="M13.5,24 L17.5,24"></path>
            <path d="M16.5,16.5 L18.5,18.5"></path>
            <path d="M29.5,29.5 L31.5,31.5"></path>
            <path d="M28,18 L30.5,15.5"></path>
            <path d="M16.5,31.5 L18.5,29.5"></path>
          </g>
        </g>
      </svg>
    );
  }

});

module.exports = Edit;
