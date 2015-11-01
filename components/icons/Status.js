// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var OK = require('./status/OK');
var ErrorStatus = require('./status/ErrorStatus');
var Warning = require('./status/Warning');
var Disabled = require('./status/Disabled');
var Unknown = require('./status/Unknown');
var Label = require('./status/Label');

var CLASS_ROOT = "status-icon";

var Status = React.createClass({
  displayName: 'Status',

  getDefaultProps: function getDefaultProps() {
    return { value: 'unknown' };
  },

  getInitialState: function getInitialState() {
    return this._stateFromProps(this.props);
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    this.setState(this._stateFromProps(newProps));
  },

  propType: {
    a11yTitle: React.PropTypes.string,
    large: React.PropTypes.bool,
    small: React.PropTypes.bool,
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    value: React.PropTypes.oneOf(['error', 'warning', 'ok', 'unknown', 'disabled'])
  },

  _stateFromProps: function _stateFromProps(props) {
    return { size: props.size || (props.small ? 'small' : props.large ? 'large' : null) };
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    if (this.state.size) {
      classes.push(CLASS_ROOT + "--" + this.state.size);
    }
    var className = classes.join(' ');
    var icon = React.createElement(
      'span',
      null,
      '?'
    );
    switch (this.props.value.toLowerCase()) {
      case 'ok':
      case 'normal':
        icon = React.createElement(OK, { className: className, a11yTitle: this.props.a11yTitle });
        break;
      case 'warning':
        icon = React.createElement(Warning, { className: className, a11yTitle: this.props.a11yTitle });
        break;
      case 'error':
      case 'critical':
        icon = React.createElement(ErrorStatus, { className: className, a11yTitle: this.props.a11yTitle });
        break;
      case 'disabled':
        icon = React.createElement(Disabled, { className: className, a11yTitle: this.props.a11yTitle });
        break;
      case 'unknown':
        icon = React.createElement(Unknown, { className: className, a11yTitle: this.props.a11yTitle });
        break;
      case 'label':
        icon = React.createElement(Label, { className: className, a11yTitle: this.props.a11yTitle });
        break;
    }
    return icon;
  }

});

module.exports = Status;