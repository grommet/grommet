// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var merge = require('lodash/object/merge');
var pick = require('lodash/object/pick');
var keys = require('lodash/object/keys');
var Box = require('./Box');

var CLASS_ROOT = "sidebar";

var Sidebar = React.createClass({
  displayName: 'Sidebar',

  propTypes: merge({
    fixed: React.PropTypes.bool,
    primary: React.PropTypes.bool, // Deprecated
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    small: React.PropTypes.bool // Deprecated
  }, Box.propTypes),

  getDefaultProps: function getDefaultProps() {
    return {
      direction: 'column',
      primary: false
    };
  },

  getInitialState: function getInitialState() {
    return this._stateFromProps(this.props);
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    this.setState(this._stateFromProps(newProps));
  },

  _stateFromProps: function _stateFromProps(props) {
    return { size: props.size || (props.small ? 'small' : props.large ? 'large' : null) };
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    var other = pick(this.props, keys(Box.propTypes));
    if (this.props.primary) {
      classes.push(CLASS_ROOT + "--primary");
    }
    if (this.props.fixed) {
      classes.push(CLASS_ROOT + "--fixed");
    }
    if (this.state.size) {
      classes.push(CLASS_ROOT + "--" + this.state.size);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return React.createElement(
      Box,
      _extends({}, other, { className: classes.join(' ') }),
      this.props.children
    );
  }

});

module.exports = Sidebar;