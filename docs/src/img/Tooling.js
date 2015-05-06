// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Tooling = React.createClass({

  render: function() {
    return (
      <svg className="home-tooling" viewBox="0 0 106 82" version="1.1">
        <g fill="#ffffff">
          <path d="M36,0H6H0v6v30v6h6h10v40h10V42h10h6v-6V6V0H36z M36,36H26v0H16v0H6V6h30V36z"/>
          <rect x="69" width="10" height="30"/>
        </g>
        <g className="home-brand">
          <rect x="11" y="11" width="20" height="20"/>
          <polygon points="77,52 77,34 71,34 71,52 71,54 71,58 99,58 99,76 69,76 45,76 45,82 69,82 99,82 99,82 105,82
            105,82 105,76 105,58 105,52 "/>
        </g>
      </svg>
    );
  }

});

module.exports = Tooling;
