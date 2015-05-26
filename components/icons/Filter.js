// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Filter = React.createClass({

  propTypes: {
    notifications: React.PropTypes.number
  },

  render: function() {
    var className = 'control-icon control-icon-filter';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var badge = null;
    if (this.props.notifications) {
      badge = (
        <g className="control-icon__badge">
          <circle stroke="none" cx="37" cy="11" r="10"/>
          <text x="33.5" y="16" fontSize={16}>{this.props.notifications}</text>
        </g>
      );
    }

    return (
      <svg className={className} viewBox="0 0 48 48" version="1.1">
        <g fill="none">
          <polygon strokeWidth="2" points="14,15 24,27 34,15 	"/>
          <line strokeWidth="2" x1="24" y1="27" x2="24" y2="36"/>
        </g>
        {badge}
      </svg>
    );
  }

});

module.exports = Filter;
