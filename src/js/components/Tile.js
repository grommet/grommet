// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "tile";

var Tile = React.createClass({

  propTypes: {
    onClick: React.PropTypes.func,
    status: React.PropTypes.string,
    wide: React.PropTypes.bool
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.status) {
      classes.push(CLASS_ROOT = "--status-" + this.props.status.toLowerCase());
    }
    if (this.props.wide) {
      classes.push(CLASS_ROOT + "--wide");
    }
    if (this.props.onClick) {
      classes.push(CLASS_ROOT + "--selectable");
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

module.exports = Tile;
