// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Add = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-add';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fill="none">
          <line strokeWidth="2" x1="24" y1="12" x2="24" y2="36"/>
          <line strokeWidth="2" x1="12" y1="24" x2="36" y2="24"/>
        </g>
      </svg>
    );
  }

});

module.exports = Add;
