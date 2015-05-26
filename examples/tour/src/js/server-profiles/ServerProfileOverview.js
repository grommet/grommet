// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Rest = require('grommet/utils/Rest');
var Actions = require('grommet/actions/Actions');
var Attribute = require('grommet/components/Attribute');
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

  _getData: function () {
    Rest.get(this.state.uri).end(this._onResponse);
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
    this.setState({uri: router.getCurrentParams().splat}, this._getData);
  },

  render: function () {
    var serverProfile = this.state.serverProfile;
    var connections;
    return (
      <div>
        <h1>{serverProfile.name}</h1>
        <Attribute label="Description">
          {serverProfile.description}
        </Attribute>
        <Attribute label="Server hardware">
          {serverProfile.serverHardware}
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
