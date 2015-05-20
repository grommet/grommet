// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var BASE_CLASS = 'status-icon';
var CLASS_ROOT = 'status-icon-disabled';

var Disabled = React.createClass({

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
    var classes = [BASE_CLASS, CLASS_ROOT]
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
      	<g className={"status-icon__base"} fill="#848484">
          <path d="M12,0 L0,12 L12,24 L24,12 L12,0 L12,0 Z" />
        </g>
        <g className={"status-icon__detail"} fill="#FFFFFF">
          <circle cx="12" cy="12" r="5.5"></circle>
      	</g>
      </svg>
    );
  }

});

module.exports = Disabled;
