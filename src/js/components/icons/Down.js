// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Down = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-down';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1"
        stroke="#979797">
        <g fill="none" fillRule="evenodd"
          strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" >
          <path d="M15,19.5 L24,26.5 L33,19.5"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Down;
