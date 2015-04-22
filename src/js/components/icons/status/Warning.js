// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Warning = React.createClass({

  render: function() {
    var className = 'status-icon status-icon-warning';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 27 24" version="1.1">
      	<g className={"status-icon__base"} fill="#F3B51D">
	        <path d="M26.758209,22.8752239 L14.1062687,0.494328358 C13.8268657,-0.071641791 13.2608955,-0.071641791 12.838209,0.494328358 L0.179104478,22.8752239 C-0.100298507,23.441194 0.179104478,24 0.745074627,24 L26.0561194,24 C26.758209,24 27.0376119,23.5773134 26.758209,22.8752239 L26.758209,22.8752239 Z"></path>
        </g>
        <g className={"status-icon__detail"} fill="#FFFFFF" transform="translate(12.250746, 7.307463)">
          <path d="M2.69373134,9.01970149 L0.0214925373,9.01970149 L0.0214925373,0.0143283582 L2.69373134,0.0143283582 L2.69373134,9.01970149 L2.69373134,9.01970149 Z M2.69373134,10.9898507 L0.0214925373,10.9898507 L0.0214925373,13.6620896 L2.69373134,13.6620896 L2.69373134,10.9898507 L2.69373134,10.9898507 Z"></path>
      	</g>
      </svg>
    );
  }

});

module.exports = Warning;
