// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RestWatch = require('../../utils/RestWatch');
var GrommetNotification = require('../Notification');
//var IndexActions = require('../../actions/IndexActions');

var CLASS_ROOT = 'resource-notifications';

var ResourceNotifications = React.createClass({

  propTypes: {
    resourceUri: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {notifications: []};
  },

  componentDidMount: function () {
    this._getData(this.props.resourceUri);
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.resourceUri !== this.props.resourceUri) {
      this.setState({runningUri: null});
      this._getData(newProps.resourceUri);
    }
  },

  componentWillUnmount: function () {
    RestWatch.stop(this._watch);
  },

  _onUpdate: function (result) {
    this.setState({notifications: result.items});
    // if we have a running task, remember it's uri so we keep it
    var newRunningUri;
    result.items.some(function (item) {
      if ('Running' === item.state &&
        item.uri !== this.state.runningUri) {
        newRunningUri = item.uri;
        return true;
      }
    }, this);

    if (newRunningUri) {
      this.setState({runningUri: newRunningUri},
        this._getData.bind(this, this.props.resourceUri));
    }
  },

  _getData: function (resourceUri) {
    if (this._watch) {
      RestWatch.stop(this._watch);
      delete this._watch;
    }
    var runningUri = '';
    if (this.state.runningUri) {
      runningUri = ' OR uri:' + this.state.runningUri;
    }
    var params = {
      category: ['alerts', 'tasks'],
      start: 0,
      count: 10,
      query: "associatedResourceUri:" + resourceUri +
        " AND (state:Active OR state:Locked OR state:Running" +
        runningUri + ")"
    };
    this._watch = RestWatch.start('/rest/index/resources',
      params, this._onUpdate);
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var notifications;
    if (this.state.notifications) {
      notifications = this.state.notifications.map(function (notification) {
        return (
          <GrommetNotification key={notification.uri} flush={false}
            status={notification.status}
            message={notification.name}
            state={notification.state}
            timestamp={new Date(notification.created)} />
        );
      }, this);
    }

    return (
      <div className={classes.join(' ')}>
        {notifications}
      </div>
    );
  }

});

module.exports = ResourceNotifications;
