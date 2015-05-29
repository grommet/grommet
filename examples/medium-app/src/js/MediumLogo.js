// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var MediumLogo = React.createClass({

  render: function() {
    var className = 'logo-icon';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g>
        	<g opacity="0.2">
        		<polygon fill="#333333" points="48,0 24,41 24,24"/>
        	</g>
        	<polygon fill="#333333" points="48,0 48,24 38.8,15.8"/>
        	<polygon opacity="0.4" fill="#333333" points="48,48 30.4,30.1 38.8,15.8"/>
        	<polygon opacity="0.8" fill="#333333" points="38.8,15.8 48,48 48,24"/>
        	<g>
        		<polygon fill="#333333" points="0,48 17.6,30.1 9.2,15.8"/>
        	</g>
        	<polygon opacity="0.2" fill="#333333" points="0,48 0,24 9.2,15.8"/>
        	<polygon opacity="0.8" fill="#333333" points="0,0 24,41 24,24"/>
        	<polygon opacity="0.4" fill="#333333" points="9.2,15.8 0,0 0,24"/>
        </g>
      </svg>
    );
  }

});

module.exports = MediumLogo;
