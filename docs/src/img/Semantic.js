// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Semantic = React.createClass({

  render: function() {
    return (
      <svg className="home-semantic" viewBox="0 0 112 76" version="1.1">
        <g fill="#ffffff">
          <polygon points="42,0 0,31.5 0,44.3 42,12.8 "/>
          <polygon points="70,75.8 112,44.3 112,31.5 70,63 "/>
        </g>
        <g className="home-brand">
          <polygon points="42,75.8 0,44.3 0,31.5 42,63 "/>
          <polygon points="70,0 112,31.5 112,44.3 70,12.8 "/>
        </g>
      </svg>
    );
  }

});

module.exports = Semantic;
