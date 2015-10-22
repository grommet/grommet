// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ReactIntl = require('react-intl');
var FormattedDate = ReactIntl.FormattedDate;

var StatusIcon = require('./icons/Status');

var CLASS_ROOT = "notification";

var Notification = React.createClass({

  propTypes: {
    flush: React.PropTypes.bool,
    message: React.PropTypes.string.isRequired,
    state: React.PropTypes.string,
    status: React.PropTypes.string,
    timestamp: React.PropTypes.object // Date
  },

  getDefaultProps: function () {
    return {
      flush: true,
      status: 'unknown'
    };
  },

  render: function() {
    var classes = [CLASS_ROOT];
    classes.push(CLASS_ROOT + "--" + this.props.status.toLowerCase());
    if (this.props.flush) {
      classes.push(CLASS_ROOT + "--flush");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var status;
    if (this.props.status) {
      status = (
        <StatusIcon className={CLASS_ROOT + "__status"}
        value={this.props.status} small={true} />
      );
    }

    var state;
    if (this.props.state) {
      state = <span className={CLASS_ROOT + "__state"}>{this.props.state}</span>;
    }

    var timestamp;
    if (this.props.timestamp) {
      var timestampFormatted = (
        <FormattedDate value={this.props.timestamp}
          weekday="long"
          day="numeric"
          month="long"
          year="numeric"
          hour="numeric"
          minute="numeric"
          second="numeric" />
      );

      timestamp = (
        <span className={CLASS_ROOT + "__timestamp"}>
          {timestampFormatted}
        </span>
      );
    }

    return (
      <div className={classes.join(' ')}>
        {status}
        <span className={CLASS_ROOT + "__message"}>
          {this.props.message}
        </span>
        {timestamp}
        {state}
        {this.props.children}
      </div>
    );
  }

});

module.exports = Notification;
