// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Close = React.createClass({

  render: function() {
    var className = 'icon-close';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" version="1.1">
        <g strokeLinecap="round" strokeWidth="4" fillRule="evenodd">
          <path d="M2,2 L22,22"></path>
          <path d="M22,2 L2,22"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Close;
