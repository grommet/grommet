// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var OK = require('./status/OK');
var ErrorStatus = require('./status/ErrorStatus');
var Warning = require('./status/Warning');
var Disabled = require('./status/Disabled');
var Unknown = require('./status/Unknown');
var Label = require('./status/Label');

var CLASS_ROOT = "status-icon";

var Status = React.createClass({

  getDefaultProps: function () {
    return {value: 'unknown'};
  },

  getInitialState: function() {
    return this._stateFromProps(this.props);
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(this._stateFromProps(newProps));
  },

  propType: {
    a11yTitle: React.PropTypes.string,
    large: React.PropTypes.bool,
    small: React.PropTypes.bool,
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    value: React.PropTypes.oneOf(['error', 'warning', 'ok', 'unknown', 'disabled'])
  },

  _stateFromProps: function (props) {
    return {size: props.size || (props.small ? 'small' : (props.large ? 'large' : null))};
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    if (this.state.size) {
      classes.push(CLASS_ROOT + "--" + this.state.size);
    }
    var className = classes.join(' ');
    var icon = (<span>{'?'}</span>);
    switch (this.props.value.toLowerCase()) {
      case 'ok':
      case 'normal':
        icon = (<OK className={className} a11yTitle={this.props.a11yTitle} />);
        break;
      case 'warning':
        icon = (<Warning className={className} a11yTitle={this.props.a11yTitle} />);
        break;
      case 'error':
      case 'critical':
        icon = (<ErrorStatus className={className} a11yTitle={this.props.a11yTitle} />);
        break;
      case 'disabled':
        icon = (<Disabled className={className} a11yTitle={this.props.a11yTitle} />);
        break;
      case 'unknown':
        icon = (<Unknown className={className} a11yTitle={this.props.a11yTitle} />);
        break;
      case 'label':
        icon = (<Label className={className} a11yTitle={this.props.a11yTitle} />);
        break;
    }
    return icon;
  }

});

module.exports = Status;
