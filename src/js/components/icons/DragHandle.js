// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var DragHandle = React.createClass({

  render: function() {
    var className = 'icon-drag-handle';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 10 22" version="1.1">
        <g stroke="none" strokeWidth="1" fill="#cccccc" fillRule="evenodd">
          <rect x="0" y="0" width="3" height="3"></rect>
          <rect x="6" y="0" width="3" height="3"></rect>
          <rect x="0" y="6" width="3" height="3"></rect>
          <rect x="6" y="6" width="3" height="3"></rect>
          <rect x="0" y="12" width="3" height="3"></rect>
          <rect x="6" y="12" width="3" height="3"></rect>
          <rect x="0" y="18" width="3" height="3"></rect>
          <rect x="6" y="18" width="3" height="3"></rect>
        </g>
      </svg>
    );
  }

});

module.exports = DragHandle;
