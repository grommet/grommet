// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Warning = React.createClass({

  render: function() {
    var className = 'status-icon-warning';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 384 384" version="1.1">
      	<g className={"status-icon__base"} fill="#F3B51D">
	        <path d="M377.5,340.3L200.9,27.9c-3.9-7.9-11.8-7.9-17.7,0L6.5,340.3c-3.9,7.9,0,15.7,7.9,15.7h353.3
		C377.5,356,381.4,350.1,377.5,340.3z"/>
        </g>
        <g className={"status-icon__detail"} fill="#FFFFFF">
          <path d="M212.6,248.9h-37.3V123.2h37.3V248.9z M212.6,276.4h-37.3v37.3h37.3V276.4z"/>
      	</g>
      </svg>
    );
  }

});

module.exports = Warning;
