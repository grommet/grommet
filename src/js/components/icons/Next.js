// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Next = React.createClass({

  render: function() {
    var className = 'icon-next';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" version="1.1">
        <g fill="none" fillRule="evenodd"
          strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8,22 L16,12 L8,2"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Next;
