// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var MobileFirst = React.createClass({

  render: function() {
    var classes = [];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <svg className={classes.join(' ')} viewBox="0 0 100 100" version="1.1">
        <g fillRule="evenodd">
        	<path fill="#FFFFFF" d="M80.4,40.4c-2.8,0-5,2.2-5,5l0,0c0,1.4-1.1,2.5-2.5,2.5s-2.5-1.1-2.5-2.5v-5c0-2.8-2.2-5-5-5
        		c-2.8,0-5,2.2-5,5v5c0,1.4-1.1,2.5-2.5,2.5c-1.4,0-2.5-1.1-2.5-2.5v-10c0-2.8-2.2-5-5-5c-2.8,0-5,2.2-5,5v10c0,1.4-1.1,2.5-2.5,2.5
        		s-2.5-1.1-2.5-2.5v-30c0-2.8-2.2-5-5-5c-2.8,0-5,2.2-5,5v46l-9.5-11.7c-2.4-2.4-6.4-2.4-8.8,0c-2.1,2.1-2.3,5.4-0.7,7.8l-0.1,0.1
        		l17.2,26.1c4.9,8.3,15.1,14.1,27,14.1c16.5,0,30-11.2,30-25V45.4C85.4,42.6,83.1,40.4,80.4,40.4z"/>
        	<rect x="0.4" y="0.4" fill="none" width="100" height="100"/>
        </g>
      </svg>
    );
  }

});

module.exports = MobileFirst;
