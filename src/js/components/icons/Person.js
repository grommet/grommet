// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Person = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-person';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fill="none">
          <circle strokeWidth="2" cx="24.2" cy="19.2" r="6.7"></circle>
          <path strokeWidth="2" d="M34.8,36.5 C34.8,30.6 30,25.8 24.1,25.8 L24.1,25.8 C18.2,25.8 13.4,30.6 13.4,36.5"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Person;
