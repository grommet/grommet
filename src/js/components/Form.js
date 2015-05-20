// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "form";

var Form = React.createClass({

  propTypes: {
    compact: React.PropTypes.bool,
    fill: React.PropTypes.bool,
    flush: React.PropTypes.bool,
    onSubmit: React.PropTypes.func,
    className: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      compact: false,
      fill: false,
      flush: true
    };
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.compact) {
      classes.push(CLASS_ROOT + "--compact");
    }
    if (this.props.fill) {
      classes.push(CLASS_ROOT + "--fill");
    }
    if (this.props.flush) {
      classes.push(CLASS_ROOT + "--flush");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <form className={classes.join(' ')} onSubmit={this.props.onSubmit}>
        {this.props.children}
      </form>
    );
  }

});

module.exports = Form;
