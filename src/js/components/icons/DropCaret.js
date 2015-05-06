// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var DropCaret = React.createClass({

  render: function() {
    var className = 'control-icon control-icon-drop-caret';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1" >
        <g fill="none">
          <path strokeWidth="2" d="M12,18l12,9l12-9"/>
        </g>
      </svg>
    );
  }

});

module.exports = DropCaret;
