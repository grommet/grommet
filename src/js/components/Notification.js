// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var ReactIntl = require('react-intl');
var FormattedDate = ReactIntl.FormattedDate;
var merge = require('lodash/object/merge');
var pick = require('lodash/object/pick');
var keys = require('lodash/object/keys');
var Box = require('./Box');

var StatusIcon = require('./icons/Status');

var CLASS_ROOT = "notification";

var Notification = React.createClass({

  propTypes: merge({
    message: React.PropTypes.string.isRequired,
    state: React.PropTypes.string,
    status: React.PropTypes.string,
    timestamp: React.PropTypes.object // Date
  }, Box.propTypes),

  getDefaultProps: function () {
    return {
      flush: true,
      status: 'unknown',
      pad: 'medium'
    };
  },

  render: function() {
    var classes = [CLASS_ROOT];
    var other = pick(this.props, keys(Box.propTypes));
    classes.push(CLASS_ROOT + "--" + this.props.status.toLowerCase());
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
      state = <div className={CLASS_ROOT + "__state"}>{this.props.state}</div>;
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
        <div className={CLASS_ROOT + "__timestamp"}>
          {timestampFormatted}
        </div>
      );
    }

    return (
      <Box className={classes.join(' ')} {...other}>
        <Box direction="row" responsive={false}>
          {status}
          <span className={CLASS_ROOT + "__message"}>
            {this.props.message}
          </span>
        </Box>
        {timestamp}
        {state}
        {this.props.children}
      </Box>
    );
  }

});

module.exports = Notification;
