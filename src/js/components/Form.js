// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Form = React.createClass({

  propTypes: {
    compact: React.PropTypes.bool,
    onSubmit: React.PropTypes.func
  },

  render: function () {
    var classes = ["form"];
    if (this.props.compact) {
      classes.push("form--compact");
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
