// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Search = React.createClass({

  render: function() {
    var className = 'icon-search';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 26 24" version="1.1">
        <g strokeWidth="4" fill="none" fillRule="evenodd">
          <circle strokeWidth="4" cx="9" cy="9" r="7"></circle>
          <path d="M15.2,15 L22.2,22" strokeWidth="4" strokeLinecap="round"></path>
          <path d="M22,1 L22,7" strokeWidth="2" strokeLinecap="round"></path>
          <path d="M25,4 L19,4" strokeWidth="2" strokeLinecap="round"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Search;
