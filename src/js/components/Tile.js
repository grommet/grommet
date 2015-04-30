// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Tile = React.createClass({

  propTypes: {
    status: React.PropTypes.string,
    wide: React.PropTypes.bool
  },

  render: function() {
    var classes = ["tile"];
    if (this.props.status) {
      classes.push("tile--status-" + this.props.status.toLowerCase());
    }
    if (this.props.wide) {
      classes.push("tile--wide");
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

module.exports = Tile;
