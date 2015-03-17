// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Tiles = React.createClass({

  // children should be an array of Tile
  render: function () {
    var classes = ["tiles"];
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

module.exports = Tiles;
