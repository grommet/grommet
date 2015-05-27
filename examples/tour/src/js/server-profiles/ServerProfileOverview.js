// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Link = require('react-router').Link;
var Rest = require('grommet/utils/Rest');
var Actions = require('grommet/actions/Actions');
var Header = require('grommet/components/Header');
var GrommetNotification = require('grommet/components/Notification');
var Attribute = require('grommet/components/Attribute');
var StatusIcon = require('grommet/components/icons/Status');
var Tiles = require('grommet/components/Tiles');
//var Tile = require('grommet/components/Tile');

var ServerProfileOverview = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _onResponse: function (err, res) {
    if (err && err.timeout > 1000) {
      this.setState({error: 'Timeout', serverProfile: {}});
    } else if (res.status === 400) {
      Actions.logout();
    } else if (!res.ok) {
      this.setState({error: res.body || res.text, serverProfile: {}});
    } else {
      this.setState({serverProfile: res.body, error: null});
    }
  },

  _onNotificationsResponse: function (err, res) {
    if (err && err.timeout > 1000) {
      this.setState({error: 'Timeout', notifications: []});
    } else if (res.status === 400) {
      Actions.logout();
    } else if (!res.ok) {
      this.setState({error: res.body || res.text, notifications: []});
    } else {
      this.setState({notifications: res.body.items, error: null});
    }
  },

  _getData: function () {
    // resource
    Rest.get(this.state.uri).end(this._onResponse);
    // notifications
    var params = {
      category: ['alerts', 'tasks'],
      start: 0,
      count: 10,
      query: "associatedResourceUri:" + this.state.uri +
        " AND (state:Active OR state:Locked OR state:Running)"
    };
    Rest.get('/rest/index/resources', params).end(this._onNotificationsResponse);
  },

  getInitialState: function () {
    var router = this.context.router;
    return {
      uri: router.getCurrentParams().splat,
      serverProfile: {},
      notifications: []
    };
  },

  componentDidMount: function () {
    this._getData();
  },

  componentWillReceiveProps: function () {
    var router = this.context.router;
    this.setState({uri: router.getCurrentParams().splat}, this._getData);
  },

  _renderNotifications: function () {
    return this.state.notifications.map(function (notification) {
      return (
        <GrommetNotification key={notification.uri} flush={false}
          status={notification.status}
          message={notification.name}
          state={notification.state}
          timestamp={notification.created} />
      );
    }, this);
  },

  render: function () {
    var serverProfile = this.state.serverProfile;

    var notifications = this._renderNotifications();

    var serverHardwareLink;
    if (serverProfile.serverHardware) {
      serverHardwareLink = (
        <Link to="server hardware"
          param={{splat: serverProfile.serverHardware.uri}}>
          {serverProfile.serverHardware.name}
        </Link>
      );
    }
    var connections;

    return (
      <div>
        <Header flush={false} small={true}>
          <span>
            <StatusIcon value={serverProfile.status} />
            {serverProfile.name}
          </span>
        </Header>

        {notifications}

        <Attribute label="Description">
          {serverProfile.description}
        </Attribute>
        <Attribute label="Server hardware">
          {serverHardwareLink}
        </Attribute>
        <Attribute label="Affinity">
          {serverProfile.affinity}
        </Attribute>

        <h2>Firmware</h2>
        <Attribute label="Firmware baseline">
          {serverProfile.firmwareBaseline}
        </Attribute>

        <h2>Connections</h2>
        <Tiles>
          {connections}
        </Tiles>

      </div>
    );
  }
});

module.exports = ServerProfileOverview;
