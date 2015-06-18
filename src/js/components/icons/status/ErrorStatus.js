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
        <g className={"status-icon__base"} fill="#F04953">
          <path d="M7,24 L0,17 L0,7 L7,0 L17,0 L24,7 L24,17 L17,24 L7,24 Z"></path>
        </g>
        <g className={"status-icon__detail"} fill="#FFFFFF" transform="translate(6.000000, 6.000000)">
          <rect transform="translate(6, 6) rotate(135.000000) translate(-6, -6) " x="-1" y="5" width="14" height="2"></rect>
          <rect transform="translate(6, 6) rotate(45.000000) translate(-6, -6) " x="-1" y="5" width="14" height="2"></rect>
        </g>
      </svg>
    );
  }

});

module.exports = ErrorStatus;
