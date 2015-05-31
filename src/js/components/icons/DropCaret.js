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
        <g stroke="none">
          <polygon points="33.4,19.7 24.1,30.3 14.8,19.7" />
        </g>
      </svg>
    );
  }

});

module.exports = DropCaret;
