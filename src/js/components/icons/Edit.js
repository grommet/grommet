// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');

var Edit = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-edit';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fill="none">
          <circle strokeWidth="2" cx="24" cy="24" r="9"/>
          <line strokeWidth="2" x1="24" y1="11" x2="24" y2="15"/>
          <line strokeWidth="2" x1="33.2" y1="14.8" x2="30.3" y2="17.6"/>
          <line strokeWidth="2" x1="37" y1="24" x2="33" y2="24"/>
          <line strokeWidth="2" x1="33.2" y1="33.2" x2="30.3" y2="30.4"/>
          <line strokeWidth="2" x1="24" y1="37" x2="24" y2="33"/>
          <line strokeWidth="2" x1="14.8" y1="33.2" x2="17.7" y2="30.4"/>
          <line strokeWidth="2" x1="11" y1="24" x2="15.2" y2="24"/>
          <line strokeWidth="2" x1="14.8" y1="14.8" x2="17.7" y2="17.6"/>
        </g>
      </svg>
    );
  }

});

module.exports = Edit;
