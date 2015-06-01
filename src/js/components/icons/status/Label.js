// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Label = React.createClass({

  render: function() {
    var className = 'status-icon status-icon-label';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" version="1.1">
        <g className={"status-icon__base"} fill="#CCCCCC">
          <circle cx="12" cy="12" r="12"></circle>
        </g>
      </svg>
    );
  }

});

module.exports = Label;
