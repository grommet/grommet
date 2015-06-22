// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var ErrorStatus = React.createClass({

  render: function() {
    var className = 'status-icon status-icon-error';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" version="1.1">
        <g className={"status-icon__base"} stroke="none">
          <path d="M12,0 L24,12 L12,24 L0,12 Z"></path>
        </g>
        <g className={"status-icon__detail"} fill="none">
          <path d="M8,8 L16,16" strokeWidth="2"></path>
          <path d="M8,16 L16,8" strokeWidth="2"></path>
        </g>
      </svg>
    );
  }

});

module.exports = ErrorStatus;
