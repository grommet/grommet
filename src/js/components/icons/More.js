// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var More = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-more';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1"
        fill="#BBBBBB">
        <g stroke="none" strokeWidth="1" fillRule="evenodd">
          <circle cx="15" cy="24" r="3"></circle>
          <circle cx="24" cy="24" r="3"></circle>
          <circle cx="33" cy="24" r="3"></circle>
        </g>
      </svg>
    );
  }

});

module.exports = More;
