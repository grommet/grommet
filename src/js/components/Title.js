// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Title = React.createClass({

  propTypes: {
    onClick: React.PropTypes.func
  },

  render: function() {
    var classes = ["title"];
    if (this.props.onClick) {
      classes.push("title--interactive");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div className={classes.join(' ')} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Title;
