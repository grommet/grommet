// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Rest = require('grommet/utils/Rest');
var GrommetNotification = require('grommet/components/Notification');
//var IndexActions = require('../../actions/IndexActions');

var CLASS_ROOT = 'resource-notifications';

var ResourceNotifications = React.createClass({

  propTypes: {
    resourceUri: React.PropTypes.string.isRequired
  },

  _onResponse: function (err, res) {
    this.setState({notifications: res.body.items});
  },

  _getData: function (resourceUri) {
    var params = {
      category: ['alerts', 'tasks'],
      start: 0,
      count: 10,
      query: "associatedResourceUri:" + resourceUri +
        " AND (state:Active OR state:Locked OR state:Running)"
    };
    Rest.get('/rest/index/resources', params).end(this._onResponse);
  },

  getInitialState: function () {
    return {notifications: []};
  },

  componentDidMount: function () {
    this._getData(this.props.resourceUri);
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.resourceUri !== this.props.resourceUri) {
      this._getData(newProps.resourceUri);
    }
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
