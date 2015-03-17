// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Filter = React.createClass({

  render: function() {
    var className = 'icon-filter';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 25" version="1.1">
        <g strokeWidth="1" fillRule="evenodd">
          <path d="M0,0 L9,11 L9,22 L15,24 L15,11 L24,0 L0,0 Z"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Filter;
