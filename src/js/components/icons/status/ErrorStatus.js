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
      	<g className={"status-icon__base"} fill="#DC462F">
          <circle cx="12" cy="12" r="12"></circle>
        </g>
        <g className={"status-icon__detail"} fill="#FFFFFF">
          <rect x="4" y="10" width="16" height="4"/>
      	</g>
      </svg>
    );
  }

});

module.exports = ErrorStatus;
