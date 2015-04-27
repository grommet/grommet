// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var App = React.createClass({

  propTypes: {
    centered: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {centered: false};
  },

  render: function() {
    var classes = ["app"];
    if (this.props.centered) {
      classes.push("app--centered");
    }
    if (this.props.inline) {
      classes.push("app--inline");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <div className={classes.join(' ')}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
