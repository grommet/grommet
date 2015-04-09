// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Right = React.createClass({

  render: function() {
    var className = 'icon-right';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" version="1.1"
        stroke="#979797">
        <g strokeLinecap="round" strokeWidth="3" fillRule="evenodd" fill="none">
          <path d="M8.5,3 L15.5,12"></path>
          <path d="M8.5,21 L15.5,12"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Right;
