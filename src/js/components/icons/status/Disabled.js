// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Disabled = React.createClass({

  render: function() {
    var className = 'status-icon status-icon-disabled';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" version="1.1">
        <g className={"status-icon__base"} fill="#EDEDED">
          <rect x="0" y="0" width="24" height="24"></rect>
        </g>
        <g className={"status-icon__detail"} stroke="#FFFFFF" strokeWidth="2" fill="none">
          <circle cx="12" cy="12" r="7" fill="none"/>
          <path d="M7.3,7.3 L16.6,16.7"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Disabled;
