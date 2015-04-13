// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var DesignIcon = React.createClass({

  render: function() {
    var className = 'icon-design';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} width="24" height="24" viewBox="0 0 24 24" version="1.1">
        <g stroke="none">
        	<path d="M0,5.6L18.3,24l5.6-5.6L5.6,0L0,5.6z M22.9,18.4L18.3,23L17,21.7l1.9-1.9l-0.5-0.5l-1.9,1.9L15,19.7
        		l1.9-1.9l-0.5-0.5l-1.9,1.9L13,17.6l1.9-1.9l-0.5-0.5l-1.9,1.9l-1.5-1.5l1.9-1.9l-0.5-0.5l-1.9,1.9l-1.5-1.5l1.9-1.9l-0.5-0.5
        		L8.4,13l-1.5-1.5l1.9-1.9L8.3,9.1L6.4,11L4.8,9.4l1.9-1.9L6.2,7L4.3,8.9L2.8,7.4l1.9-1.9L4.2,5L2.3,6.9L1,5.6L5.6,1L22.9,18.4z"/>
      		<polygon points="21.7,5.9 18.2,2.3 20.4,0.1 24,3.6 		"/>
      		<g>
      			<polygon points="1.9,22.3 5.9,21.8 2.4,18.2 			"/>
      			<polygon points="20.6,7 17.1,3.5 4.1,16.5 7.6,20.1 			"/>
      		</g>
      	</g>
      </svg>
    );
  }

});

module.exports = DesignIcon;
