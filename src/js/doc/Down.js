// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Down = React.createClass({

  render: function() {
    var className = 'down';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg viewBox="0 0 24 12" version="1.1" className={className}>
        <g stroke="#000000" strokeWidth="6" fill="none" fillRule="evenodd"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M3,3 L12,9 L21,3"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Down;
