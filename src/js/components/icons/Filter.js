// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Filter = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-filter';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fill="none">
        	<polygon strokeWidth="2" points="12,13 24,27 36,13 	"/>
        	<line strokeWidth="2" x1="24" y1="27" x2="24" y2="38"/>
        </g>
      </svg>
    );
  }

});

module.exports = Filter;
