// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Edit = React.createClass({

  render: function() {
    var className = 'icon-edit';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" version="1.1">
        <g fill="none" fill-rule="evenodd">
          <circle strokeWidth="4" cx="12" cy="12" r="7"></circle>
          <path d="M12,1.5 L12,5.5" strokeWidth="3" strokeLinecap="round"></path>
          <path d="M12,18.5 L12,22.5" strokeWidth="3" strokeLinecap="round"></path>
          <path d="M18.5,12 L22.5,12" strokeWidth="3" strokeLinecap="round"></path>
          <path d="M1.5,12 L5.5,12" strokeWidth="3" strokeLinecap="round"></path>
          <path d="M4.5,4.5 L6.5,6.5" strokeWidth="3" strokeLinecap="round"></path>
          <path d="M17.5,17.5 L19.5,19.5" strokeWidth="3" strokeLinecap="round"></path>
          <path d="M16,6 L18.5,3.5" strokeWidth="3" strokeLinecap="round"></path>
          <path d="M4.5,19.5 L6.5,17.5" strokeWidth="3" strokeLinecap="round"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Edit;
