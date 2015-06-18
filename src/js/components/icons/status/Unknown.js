// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Unknown = React.createClass({

  render: function() {
    var className = 'status-icon status-icon-unknown';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" version="1.1">
        <g className={"status-icon__base"} fill="#CCCCCC">
          <rect transform="translate(12, 12) rotate(225) translate(-12, -12) " x="3.5" y="3.5" width="17" height="17"></rect>
        </g>
        <g className={"status-icon__detail"} fill="#FFFFFF">
          <path d="M12.6,14.6 L11.4,14.6 L11.4,12.2 C11.4,11.9 11.7,11.6 12,11.6 C13,11.6 13.8,10.8 13.8,9.8 C13.8,9.3 13.6,8.9 13.3,8.6 C13,8.3 12.5,8.1 12,8.1 C11,8.1 10.2,8.9 10.2,9.9 L9,9.9 C9,8.3 10.3,7 12,7 C12.8,7 13.6,7.3 14.1,7.9 C14.6,8.5 15,9.2 15,9.9 C15,11.3 14,12.5 12.6,12.8 L12.6,14.6 L12.6,14.6 Z M11.4,17 L12.6,17 L12.6,15.8 L11.4,15.8 L11.4,17 L11.4,17 Z"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Unknown;
