// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var merge = require('lodash/object/merge');
var pick = require('lodash/object/pick');
var keys = require('lodash/object/keys');
var Box = require('./Box');

var CLASS_ROOT = "tile";

var Tile = React.createClass({
  displayName: 'Tile',

  propTypes: merge({
    selected: React.PropTypes.bool,
    status: React.PropTypes.string,
    wide: React.PropTypes.bool
  }, Box.propTypes),

  getDefaultProps: function getDefaultProps() {
    return {
      pad: 'none',
      direction: 'column',
      align: 'center'
    };
  },

  render: function render() {
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

    return React.createElement(
      Box,
      _extends({ className: classes.join(' ') }, other, { onClick: this.props.onClick }),
      this.props.children
    );
  }

});

module.exports = Tile;