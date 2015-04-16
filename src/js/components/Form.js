// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Form = React.createClass({

  propTypes: {
    className: React.PropTypes.string,
    onSubmit: React.PropTypes.func
  },

  render: function () {
    var classes = ["form"];
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
