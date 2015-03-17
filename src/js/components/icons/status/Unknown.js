// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Unknown = React.createClass({

  render: function() {
    var className = 'status-icon-unknown';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 384 384" version="1.1">
      	<g className={"status-icon__base"} fill="#848484">
          <path d="M192,7L7,192l185,185l185-185L192,7z"/>
        </g>
        <g className={"status-icon__detail"} fill="#FFFFFF">
          <path d="M260.2,145.3c0,7.8-3.9,15.6-7.8,23.4c-5.8,5.8-13.6,17.5-29.2,29.2
          	c-7.8,5.8-11.7,11.7-13.6,15.6v5.8c-1.9,3.9-1.9,11.7-1.9,21.4h-31.2V231c0-9.7,1.9-23.4,5.8-31.2c1.9-5.8,9.7-13.6,21.4-23.4
          	c11.7-9.7,17.5-15.6,19.5-17.5c3.9-3.9,5.8-7.8,5.8-13.6s-3.9-11.7-9.7-17.5s-15.6-7.8-25.3-7.8c-9.7,0-17.5,1.9-25.3,5.8
          	c-5.8,3.9-11.7,9.7-13.6,17.5h-31.2c0-15.6,7.8-29.2,19.5-40.9c13.6-11.7,29.2-17.5,48.7-17.5c21.4,0,38.9,5.8,50.6,17.5
          	C254.3,114.2,260.2,129.7,260.2,145.3z M192,252.4c-11.7,0-23.4,11.7-23.4,23.4c0,11.7,11.7,23.4,23.4,23.4s23.4-11.7,23.4-23.4
          	S203.7,252.4,192,252.4z"/>
      	</g>
      </svg>
    );
  }

});

module.exports = Unknown;
