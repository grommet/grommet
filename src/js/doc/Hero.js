// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');

var Hero = React.createClass({

  render: function() {
    var classes = ['hero'];
    return (
      <div className={classes.join(' ')}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Hero;
