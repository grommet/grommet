// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Critical = React.createClass({

  render: function() {
    var className = 'status-icon-error';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 384 384" version="1.1">
      	<g className={"status-icon__base"} fill="#DC462F">
          <path d="M192,22C98,22,22,98,22,192s76,170,170,170s170-76,170-170S286,22,192,22z"/>
        </g>
        <g className={"status-icon__detail"} fill="#FFFFFF">
          <rect x="82" y="162" width="220" height="60"/>
      	</g>
      </svg>
    );
  }

});

module.exports = Critical;
