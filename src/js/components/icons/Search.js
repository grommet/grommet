// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Search = React.createClass({

  render: function() {
    var className = 'icon-search';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 25" version="1.1">
        <g strokeWidth="4" fill="none" fillRule="evenodd">
          <circle cx="9" cy="9" r="7"></circle>
          <path d="M15,15 L22,22" strokeLinecap="round"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Search;
