// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Previous = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-previous';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fill="none" fillRule="evenodd"
          strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M28,34 L20,24 L28,14"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Previous;
