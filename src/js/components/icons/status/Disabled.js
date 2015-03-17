// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Disabled = React.createClass({

  render: function() {
    var className = 'status-icon-disabled';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 384 384" version="1.1">
      	<g className={"status-icon__base"} fill="#848484">
          <path d="M192,7L7,192l185,185l185-185L192,7z" />
        </g>
        <g className={"status-icon__detail"} fill="#FFFFFF">
        	<path d="M192,279.6c-48.7,0-87.6-38.9-87.6-87.6s38.9-87.6,87.6-87.6s87.6,38.9,87.6,87.6S240.7,279.6,192,279.6z" />
      	</g>
      </svg>
    );
  }

});

module.exports = Disabled;
