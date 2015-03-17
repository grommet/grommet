// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var DropCaret = React.createClass({

  render: function() {
    var className = 'icon-drop-caret';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" version="1.1" >
        <g strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
          fill="none" fillRule="evenodd" >
          <path d="M3,9 L12,18 L21,9"></path>
        </g>
      </svg>
    );
  }

});

module.exports = DropCaret;
