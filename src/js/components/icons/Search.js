// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Search = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-search';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g strokeWidth="4" fill="none" fillRule="evenodd">
          <circle cx="21" cy="21" r="7"></circle>
          <path d="M27,27 L34,34" strokeLinecap="round"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Search;
