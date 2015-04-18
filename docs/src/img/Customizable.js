// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Customizable = React.createClass({

  render: function() {
    var classes = [];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <svg className={classes.join(' ')} viewBox="0 0 100 100" version="1.1">
        <g fillRule="evenodd">
        	<path fill="#FFFFFF" d="M92,28.7L75.4,45.4l-15-5l-5-15L72,8.7c-2.1-0.5-4.3-0.8-6.7-0.8c-15.2,0-27.5,12.3-27.5,27.5
        		c0,4.7,1.2,9,3.2,12.9L11.7,68.1l0.1,0c-0.7,0.5-1.4,1-2,1.7c-5.9,5.9-5.9,15.4,0,21.2c5.9,5.9,15.4,5.9,21.2,0
        		c0.8-0.8,2-2.5,2-2.5l19.5-28.8c3.8,2,8.2,3.2,12.9,3.2c15.2,0,27.5-12.3,27.5-27.5C92.9,33.1,92.6,30.8,92,28.7z M20.4,87.9
        		c-4.1,0-7.5-3.4-7.5-7.5s3.4-7.5,7.5-7.5s7.5,3.4,7.5,7.5S24.5,87.9,20.4,87.9z"/>
        	<rect x="0.4" y="0.4" fill="none" width="100" height="100"/>
        </g>
      </svg>
    );
  }

});

module.exports = Customizable;
