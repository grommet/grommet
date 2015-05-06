// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Console = React.createClass({

  render: function() {
    return (
      <svg className="home-console" viewBox="0 0 460 300" version="1.1">
        <g>
          <polyline fill="#887C76" points="375.8,14 375.8,193.8 84.3,193.8 84.3,14 375.8,14 "/>
          <polyline fill="#333333" points="70.3,207.8 1.8,299.5 458.4,299.5 389.8,207.8 "/>
        </g>
        <g fill="#ffffff" className="brand-font">
          <text transform="matrix(1 0 0 1 127.6208 116.4104)" fontSize="42">Hello World!</text>
        </g>
        <g className="home-brand">
          <path d="M389.8,0h-14H84.3h-14v14v179.8v14h14h291.5h14v-14V14V0L389.8,0z M375.8,14v179.8H84.3V14H375.8"/>
        </g>
      </svg>
    );
  }

});

module.exports = Console;
