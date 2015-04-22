// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var DropCaret = require('./icons/DropCaret');

var Title = React.createClass({

  render: function() {
    var classes = ["title"];
    var caret = null;

    if (this.props.menu) {
      classes.push("title--menu");
      caret = (
        <DropCaret className="title__caret" />
      );
    }

    return (
      <div className={classes.join(' ')}>
        {this.props.children}
        {caret}
      </div>
    );
  }

});

module.exports = Title;
