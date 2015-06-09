// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "button";

var Button = React.createClass({

  propTypes: {
    alternate: React.PropTypes.bool,
    label: React.PropTypes.string.isRequired,
    large: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    primary: React.PropTypes.bool,
    small: React.PropTypes.bool,
    strong: React.PropTypes.bool
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.primary) {
      classes.push(CLASS_ROOT + "--primary");
    }
    if (this.props.alternate) {
      classes.push(CLASS_ROOT + "--alternate");
    }
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.small) {
      classes.push(CLASS_ROOT + "--small");
    }
    if (this.props.strong) {
      classes.push(CLASS_ROOT + "--strong");
    }
    if (! this.props.onClick) {
      classes.push(CLASS_ROOT + "--disabled");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <button className={classes.join(' ')}
        onClick={this.props.onClick}>
        {this.props.label}
      </button>
    );
  }

});

module.exports = Button;
