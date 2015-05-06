// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var MobileFirst = React.createClass({

  render: function() {
    return (
      <svg className="home-mobile-first" viewBox="0 0 90 82" version="1.1">
        <g fill="#ffffff">
        	<rect x="40" y="69.2" width="10" height="12"/>
        	<rect x="60" y="69.2" width="10" height="12"/>
        	<rect x="80" y="69.2" width="10" height="12"/>
          <polyline points="30,21.2 30,81.2 20,81.2 20,21.2 30,21.2 "/>
        </g>
        <g className="home-brand">
          <path d="M40,11v30v10h10V41V11V1l0,0H40H10H0v10v30v10h10V41V11H40"/>
        </g>
      </svg>
    );
  }

});

module.exports = MobileFirst;
