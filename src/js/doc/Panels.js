// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');

var Panels = React.createClass({

  render: function() {
    var classes = ['panels'];
    return (
      <div className={classes.join(' ')}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Panels;
