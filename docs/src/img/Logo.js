// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Logo = React.createClass({

  render: function() {
    var classes = [];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <svg className={classes.join(' ')} viewBox="0 0 120 120" version="1.1">
        <g fill="none" fillRule="evenodd">
          <path d="M60,119 C92.5848002,119 119,92.5848002 119,60 C119,27.4151998 92.5848002,1 60,1 C27.4151998,1 1,27.4151998 1,60 C1,92.5848002 27.4151998,119 60,119 Z" stroke="#dddddd" fill="#dddddd"></path>
          <rect stroke="#00B388" strokeWidth="6" fill="#666666" x="22" y="22" width="76" height="76"></rect>
          <rect stroke="#00B388" fill="#333333" strokeWidth="6" transform="translate(60.000000, 60.000000) rotate(-45.000000) translate(-60.000000, -60.000000) " x="22" y="22" width="76" height="76"></rect>
          <circle stroke="#cccccc" fill="#FFFFFF" cx="60" cy="60" r="34"></circle>
        </g>
      </svg>
    );
  }

});

module.exports = Logo;
