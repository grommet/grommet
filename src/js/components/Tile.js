// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var merge = require('lodash/object/merge');
var pick = require('lodash/object/pick');
var keys = require('lodash/object/keys');
var Box = require('./Box');

var CLASS_ROOT = "tile";

var Tile = React.createClass({

  propTypes: merge({
    selected: React.PropTypes.bool,
    status: React.PropTypes.string,
    wide: React.PropTypes.bool
  }, Box.propTypes),

  getDefaultProps: function () {
    return {
      pad: 'none',
      direction: 'column',
      align: 'center'
    };
  },

  render: function() {
    var classes = [CLASS_ROOT];
    var other = pick(this.props, keys(Box.propTypes));
    if (this.props.status) {
      classes.push(CLASS_ROOT + "--status-" + this.props.status.toLowerCase());
    }
    if (this.props.wide) {
      classes.push(CLASS_ROOT + "--wide");
    }
    if (this.props.onClick) {
      classes.push(CLASS_ROOT + "--selectable");
    }
    if (this.props.selected) {
      classes.push(CLASS_ROOT + "--selected");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <Box className={classes.join(' ')} {...other} onClick={this.props.onClick}>
        {this.props.children}
      </Box>
    );
  }

});

module.exports = Tile;
