// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Disabled = React.createClass({

  render: function() {
    var className = 'status-icon-disabled';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" version="1.1">
      	<g className={"status-icon__base"} fill="#848484">
          <path d="M12,0 L0,12 L12,24 L24,12 L12,0 L12,0 Z" />
        </g>
        <g className={"status-icon__detail"} fill="#FFFFFF">
          <circle cx="12" cy="12" r="5.5"></circle>
      	</g>
      </svg>
    );
  }

});

module.exports = Disabled;
