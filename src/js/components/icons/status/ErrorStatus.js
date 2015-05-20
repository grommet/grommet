// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var BASE_CLASS = 'status-icon';
var CLASS_ROOT = 'status-icon-error';

var ErrorStatus = React.createClass({

  propTypes: {
    small: React.PropTypes.bool,
    large: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      small: false,
      large: false
    };
  },

  render: function() {
    var classes = [BASE_CLASS, CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    if (this.props.large) {
      classes.push(BASE_CLASS + "--large");
    }
    if (this.props.small) {
      classes.push(BASE_CLASS + "--small");
    }
    return (
      <svg className={classes.join(' ')} viewBox="0 0 24 24" version="1.1">
      	<g className={"status-icon__base"} fill="#DC462F">
          <circle cx="12" cy="12" r="12"></circle>
        </g>
        <g className={"status-icon__detail"} fill="#FFFFFF">
          <rect x="4" y="10" width="16" height="4"/>
      	</g>
      </svg>
    );
  }

});

module.exports = ErrorStatus;
