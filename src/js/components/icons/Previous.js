// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Previous = React.createClass({

  render: function() {
    var className = 'icon-previous';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" version="1.1">
        <g fill="none" fillRule="evenodd"
          strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16,22 L8,12 L16,2"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Previous;
