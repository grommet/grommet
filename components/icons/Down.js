// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Down = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-down';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fill="none">
          <polyline strokeWidth="2" points="34,27.1 24,35 14,27 "/>
          <path strokeWidth="2" d="M24,34.7C24,12,24,12,24,12"/>
        </g>
      </svg>
    );
  }

});

module.exports = Down;
