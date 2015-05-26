// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Clear = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-clear';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fill="none">
          <line strokeWidth="2" x1="12" y1="12" x2="36" y2="36"/>
          <line strokeWidth="2" x1="12" y1="36" x2="36" y2="12"/>
        </g>
      </svg>
    );
  }

});

module.exports = Clear;
