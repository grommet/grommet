// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Scale = React.createClass({

  render: function() {
    var classes = [];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <svg className={classes.join(' ')} viewBox="0 0 100 100" version="1.1">
        <g fillRule="evenodd">
  	      <g>
            <g>
        			<polygon fill="#FFFFFF" points="10.4,57.9 40.4,80.4 40.4,65.4 20.4,50.4 40.4,35.4 40.4,20.4 10.4,42.9 			"/>
        			<polygon fill="#FFFFFF" points="60.4,20.4 60.4,35.4 80.4,50.4 60.4,65.4 60.4,80.4 90.4,57.9 90.4,42.9 			"/>
        		</g>
        	</g>
        	<rect x="0.4" y="0.4" fill="none" width="100" height="100"/>
        </g>
      </svg>
    );
  }

});

module.exports = Scale;
