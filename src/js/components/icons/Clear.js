// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Clear = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-clear';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g strokeLinecap="round" strokeWidth="4" fillRule="evenodd">
          <path d="M14,14 L34,34"></path>
          <path d="M34,14 L14,34"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Clear;
