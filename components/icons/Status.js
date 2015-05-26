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

  propType: {
    large: React.PropTypes.bool,
    small: React.PropTypes.bool,
    value: React.PropTypes.oneOf(['error', 'warning', 'ok', 'unknown', 'disabled'])
  },

  getDefaultProps: function () {
    return {value: 'unknown'};
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    if (this.props.small) {
      classes.push(CLASS_ROOT + "--small");
    }
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    var className = classes.join(' ');
    var icon = (<span>{'?'}</span>);
    switch (this.props.value) {
    case 'ok':
    case 'normal':
      icon = (<OK className={className} />);
      break;
    case 'warning':
      icon = (<Warning className={className} />);
      break;
    case 'error':
    case 'critical':
      icon = (<ErrorStatus className={className} />);
      break;
    case 'disabled':
      icon = (<Disabled className={className} />);
      break;
    case 'unknown':
      icon = (<Unknown className={className} />);
      break;
    case 'label':
      icon = (<Label className={className} />);
      break;
    }
    return icon;
  }

});

module.exports = Status;
