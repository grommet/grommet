// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Top = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-top';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1"
        stroke="#979797">
        <g strokeLinecap="round" strokeWidth="3" fillRule="evenodd" fill="none">
          <path d="M24,22.5 L33,29.5"></path>
          <path d="M15,18.5 L33,18.5"></path>
          <path d="M24,22.5 L15,29.5"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Top;
