// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Customizable = React.createClass({

  render: function() {
    return (
      <svg className="home-customizable" viewBox="0 0 84 94" version="1.1">
        <g fill="#ffffff">
          <path d="M77.2,6v29.9H6V6H77.2 M83.2,0H0v41.9h83.2V0L83.2,0z"/>
          <rect x="11" y="62.8" width="20" height="20"/>
        </g>
        <g className="home-brand">
          <path d="M77.2,57.9v29.9H6V57.9H77.2 M83.2,51.9H0v41.9h83.2V51.9L83.2,51.9z"/>
          <rect x="52.2" y="10.9" width="20" height="20"/>
        </g>
      </svg>
    );
  }

});

module.exports = Customizable;
