// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Link = require('react-router').Link;
var RestWatch = require('grommet/utils/RestWatch');
var Header = require('grommet/components/Header');
var ResourceNotifications = require('grommet/components/index/ResourceNotifications');
var Attribute = require('grommet/components/Attribute');
var StatusIcon = require('grommet/components/icons/Status');
var Tiles = require('grommet/components/Tiles');
//var Tile = require('grommet/components/Tile');

var ServerProfileOverview = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _onUpdate: function (result) {
    this.setState({serverProfile: result});
  },

  _getData: function () {
    this._watch = RestWatch.start(this.state.uri, null, this._onUpdate);
  },

  getInitialState: function () {
    var router = this.context.router;
    return {
      uri: router.getCurrentParams().splat,
      serverProfile: {}
    };
  },

  componentDidMount: function () {
    this._getData();
  },

  componentWillReceiveProps: function () {
    var router = this.context.router;
    var uri = router.getCurrentParams().splat;
    if (uri !== this.state.uri) {
      this.setState({uri: uri}, this._getData);
    }
  },

  componentWillUnmount: function () {
    RestWatch.stop(this._watch);
  },

  render: function () {
    var serverProfile = this.state.serverProfile;

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

        <ResourceNotifications resourceUri={this.state.uri} />

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
