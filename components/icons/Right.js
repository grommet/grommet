// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Right = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-right';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fill="none">
          <polyline strokeWidth="2" points="27.1,14 35,24 27,34" />
          <path strokeWidth="2" d="M34.7,24C12,24,12,24,12,24" />
        </g>
      </svg>
    );
  }

});

module.exports = Right;
