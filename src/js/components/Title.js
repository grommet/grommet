// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var DropCaret = require('./icons/DropCaret');

var Title = React.createClass({

  propTypes: {
    onClick: React.PropTypes.func
  },

  render: function() {
    var classes = ["title"];
    var caret = null;

    if (this.props.onClick) {
      classes.push("title--menu");
      caret = (
        <DropCaret className="title__caret" />
      );
    }

    return (
      <div className={classes.join(' ')} onClick={this.props.onClick}>
        {this.props.children}
        {caret}
      </div>
    );
  }

});

module.exports = Title;
