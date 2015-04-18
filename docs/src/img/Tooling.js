// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Tooling = React.createClass({

  render: function() {
    var classes = [];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <svg className={classes.join(' ')} viewBox="0 0 100 100" version="1.1">
        <g fillRule="evenodd">
        	<path fill="#FFFFFF" d="M42.8,51.6L85.4,9.1l5,0l0,5L47.8,56.6h-5V51.6z M54.1,67.9v4l-0.2,0.2l-18.7,5.4L21.9,64.4l5.4-18.7
        		l0.2-0.2h4.1L67.8,9.1H56.6L22.8,43L9.1,90.4l47.3-13.8l33.9-33.8V31.6L54.1,67.9z"/>
        	<rect x="0.4" y="0.4" fill="none" width="100" height="100"/>
        </g>
      </svg>
    );
  }

});

module.exports = Tooling;
