// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

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
          <polyline strokeWidth="2" strokeMiterlimit="10" points="34,19 24,29 14,19 "/>
        </g>
      </svg>
    );
  }

});

module.exports = DropCaret;
