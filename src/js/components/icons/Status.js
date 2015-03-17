// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var OK = require('./status/OK');
var Warning = require('./status/Warning');
var Critical = require('./status/Critical');
var Disabled = require('./status/Disabled');
var Unknown = require('./status/Unknown');
var Label = require('./status/Label');

var Status = React.createClass({

  render: function() {
    var className = "status-icon";
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    if (this.props.small) {
      className += " status-icon--small";
    }
    var icon = (<span>{'?'}</span>);
    switch (this.props.value) {
    case 'ok':
      icon = (<OK className={className} />);
      break;
    case 'warning':
      icon = (<Warning className={className} />);
      break;
    case 'critical':
      icon = (<Critical className={className} />);
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
