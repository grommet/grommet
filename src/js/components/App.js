// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var App = React.createClass({

  render: function() {
    var classes = ["app"];
    return (
      <div className={classes.join(' ')}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
