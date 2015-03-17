// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var More = React.createClass({

  render: function() {
    var className = 'icon-more';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" version="1.1"
        fill="#BBBBBB">
        <g stroke="none" strokeWidth="1" fillRule="evenodd">
          <circle cx="3" cy="12" r="3"></circle>
          <circle cx="12" cy="12" r="3"></circle>
          <circle cx="21" cy="12" r="3"></circle>
        </g>
      </svg>
    );
  }

});

module.exports = More;
