// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Up = React.createClass({

  render: function() {
    var className = 'icon-up';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" version="1.1"
        stroke="#979797">
        <g strokeLinecap="round" strokeWidth="3" fillRule="evenodd" fill="none">
          <path d="M3,14.5 L12,7.5"></path>
          <path d="M12,7.5 L21,14.5"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Up;
