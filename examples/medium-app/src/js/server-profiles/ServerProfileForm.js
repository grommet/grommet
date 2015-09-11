// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var merge = require('lodash/object/merge');
var Form = require('grommet/components/Form');
var Menu = require('grommet/components/Menu');
var Footer = require('grommet/components/Footer');
var FormFields = require('grommet/components/FormFields');
var FormField = require('grommet/components/FormField');
var SearchInput = require('grommet/components/SearchInput');
var CheckBox = require('grommet/components/CheckBox');
var RadioButton = require('grommet/components/RadioButton');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Header = require('grommet/components/Header');
var CloseIcon = require('grommet/components/icons/Clear');
var Rest = require('grommet/utils/Rest');
var ServerProfileConnectionAdd = require('./ServerProfileConnectionAdd');
var ServerProfileVolumeAdd = require('./ServerProfileVolumeAdd');
var BusyIcon = require('grommet/components/icons/Spinning');

var ServerProfileForm = React.createClass({

  propTypes: {
    buttonLabel: React.PropTypes.string.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    processingMessage: React.PropTypes.string,
    serverProfile: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      serverProfile: merge({}, this.props.serverProfile),
      serverHardwareSuggestions: [],
      firmwareSuggestions: []
    };
  },

  componentDidMount: function () {
    this._onServerHardwareSearch('');
    this._onFirmwareSearch('');
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({serverProfile: newProps.serverProfile});
  },

  _onSubmit: function (event) {
    event.preventDefault();
    this.props.onSubmit(this.state.serverProfile);
  },

  _onChange: function (event) {
    var serverProfile = this.state.serverProfile;
    serverProfile[event.target.getAttribute('name')] = event.target.value;
    this.setState({serverProfile: serverProfile});
  },

  _onServerHardwareChange: function (value) {
    var serverProfile = this.state.serverProfile;
    var serverHardware = {uri: value.value, name: value.label};
    serverProfile.serverHardware = serverHardware;
    this.setState({serverProfile: serverProfile});
  },

  _onServerHardwareSearchResponse: function (err, res) {
    if (err) {
      throw err;
    }

    if (res.ok) {
      var suggestions = res.body.map(function (item) {
        return {value: item.uri, label: item.name};
      });
      this.setState({serverHardwareSuggestions: suggestions});
    }
  },

  _onServerHardwareSearch: function (value) {
    var params = {category: 'server-hardware', query: value,
      start: 0, count: 5};
    Rest.get('/rest/index/search-suggestions', params)
      .end(this._onServerHardwareSearchResponse);
  },

  _onFirmwareChange: function (value) {
    var serverProfile = this.state.serverProfile;
    serverProfile.firmware = value;
    this.setState({serverProfile: serverProfile});
  },

  _onFirmwareSearchResponse: function (err, res) {
    if (err) {
      throw err;
    }

    if (res.ok) {
      var names = res.body.map(function (item) {
        return item.name;
      });
      this.setState({firmwareSuggestions: names});
    }
  },

  _onFirmwareSearch: function (value) {
    var params = {category: 'firmware-drivers', query: value,
      start: 0, count: 5};
    Rest.get('/rest/index/search-suggestions', params)
      .end(this._onFirmwareSearchResponse);
  },

  _onAddConnection: function (connection) {
    var serverProfile = this.state.serverProfile;
    serverProfile.connections.push(connection);
    this.setState({serverProfile: serverProfile});
  },

  _onNewConnectionOpen: function (event) {
    event.preventDefault();
    this.setState({addConnection: true});
  },

  _onNewConnectionClose: function () {
    this.setState({addConnection: false});
  },

  _onRemoveConnection: function (index) {
    var serverProfile = this.state.serverProfile;
    serverProfile.connections.splice(index, 1);
    this.setState({serverProfile: serverProfile});
  },

  _onAddVolume: function (volume) {
    var serverProfile = this.state.serverProfile;
    serverProfile.volumes.push(volume);
    this.setState({serverProfile: serverProfile});
  },

  _onNewVolumeOpen: function (event) {
    event.preventDefault();
    this.setState({addVolume: true});
  },

  _onNewVolumeClose: function () {
    this.setState({addVolume: false});
  },

  _onRemoveVolume: function (index) {
    var serverProfile = this.state.serverProfile;
    serverProfile.volumes.splice(index, 1);
    this.setState({serverProfile: serverProfile});
  },

  _renderConnections: function () {
    return this.state.serverProfile.connections.map(function (connection, index) {
      return (
        <Tile key={connection.name}>
          <Header small={true}>
            {connection.name}
            <Menu>
              <div onClick={this._onRemoveConnection.bind(this, index)}>
                <CloseIcon />
              </div>
            </Menu>
          </Header>
          <div>{connection.type}</div>
          <div>{connection.network}</div>
          <div>{connection.bandwidth}</div>
          <div>{connection.port}</div>
          <div>{connection.boot}</div>
        </Tile>
      );
    }, this);
  },

  _renderVolumes: function () {
    return this.state.serverProfile.volumes.map(function (volume, index) {
      return (
        <Tile key={volume.name}>
          <Header small={true}>
            {volume.name}
            <Menu>
              <div onClick={this._onRemoveVolume.bind(this, index)}>
                <CloseIcon />
              </div>
            </Menu>
          </Header>
        </Tile>
      );
    }, this);
  },

  render: function () {
    var serverProfile = this.state.serverProfile;

    var connections;
    if (serverProfile.connections) {
      connections = this._renderConnections();
    }

    var addConnection = null;
    if (this.state.addConnection) {
      addConnection = (
        <ServerProfileConnectionAdd
          onAdd={this._onAddConnection}
          onClose={this._onNewConnectionClose} />
      );
    }

    var volumes;
    if (serverProfile.volumes) {
      volumes = this._renderVolumes();
    }

    var addVolume = null;
    if (this.state.addVolume) {
      addVolume = (
        <ServerProfileVolumeAdd
          onAdd={this._onAddVolume}
          onClose={this._onNewVolumeClose} />
      );
    }

    var actions = null;
    if (this.props.processingMessage) {
      actions = <span><BusyIcon /> {this.props.processingMessage}</span>;
    } else {
      actions = (
        <input type="submit" className="primary"
          value={this.props.buttonLabel}
          onClick={this._onSubmit} />
      );
    }

    var serverHardwareValue;
    if (serverProfile.serverHardware) {
      serverHardwareValue = {
        value: serverProfile.serverHardware.uri,
        label: serverProfile.serverHardware.name
      };
    }

    return (
      <Form pad="medium">
        <FormFields>

          <fieldset>
            <legend>General</legend>
            <FormField label="Name" htmlFor="name">
              <input id="name" name="name" type="text"
                value={serverProfile.name} onChange={this._onChange} />
            </FormField>
            <FormField label="Description" htmlFor="description">
              <input id="description" name="description" type="text"
                value={serverProfile.description} onChange={this._onChange} />
            </FormField>
            <FormField label="Server hardware" htmlFor="serverHardware">
              <SearchInput id="serverHardware" name="serverHardware"
                value={serverHardwareValue}
                suggestions={this.state.serverHardwareSuggestions}
                onChange={this._onServerHardwareChange}
                onSearch={this._onServerHardwareSearch} />
            </FormField>
            <FormField label="Affinity" htmlFor="affinity">
              <select id="affinity" name="affinity"
                value={serverProfile.affinity}
                onChange={this._onChange}>
                <option>Device bay</option>
                <option>Device bay and hardware</option>
              </select>
            </FormField>
          </fieldset>

          <fieldset>
            <legend>Firmware</legend>
            <FormField label="Firmware baseline" htmlFor="firmware">
              <SearchInput id="firmware" name="firmware"
                value={serverProfile.firmware}
                suggestions={this.state.firmwareSuggestions}
                onChange={this._onFirmwareChange}
                onSearch={this._onFirmwareSearch} />
            </FormField>
          </fieldset>

          <fieldset>
            <legend>Connections</legend>
            <Tiles flush={false}>
              {connections}
            </Tiles>
            <button onClick={this._onNewConnectionOpen}>Add Connection</button>
          </fieldset>

          <fieldset>
            <legend>Local Storage</legend>
            <CheckBox id="manageLocalStorage" name="manageLocalStorage"
              label="Manage local storage"
              checked={serverProfile.manageLocalStorage}
              onChange={this._onChange}/>
            <FormField label="Logical drive" htmlFor="logicalDrive">
              <select id="logicalDrive" name="logicalDrive"
                value={serverProfile.logicalDrive}
                onChange={this._onChange}>
                <option>None</option>
                <option>RAID 0</option>
                <option>RAID 1</option>
              </select>
            </FormField>
            <FormField htmlFor="logicalDriveBootable">
              <CheckBox id="logicalDriveBootable" name="logicalDriveBootable"
                label="Bootable"
                checked={serverProfile.logicalDriveBootable}
                onChange={this._onChange}/>
            </FormField>
            <FormField htmlFor="logicalDriveInitialize">
              <CheckBox id="logicalDriveInitialize" name="logicalDriveInitialize"
                label="Initialize"
                checked={serverProfile.logicalDriveInitialize}
                onChange={this._onChange}/>
            </FormField>
          </fieldset>

          <fieldset>
            <legend>SAN Storage</legend>
            <CheckBox id="manageSanStorage" name="manageSanStorage"
              label="Manage SAN storage"
              checked={serverProfile.manageSanStorage}
              onChange={this._onChange}/>
            <FormField label="Host OS type" htmlFor="hostOsType">
              <select id="hostOsType" name="hostOsType"
                value={serverProfile.hostOsType}
                onChange={this._onChange}>
                <option>AIX</option>
                <option>Citrix Xen Server (5.x, 6.x)</option>
                <option>ESX (4.x, 5.x)</option>
                <option>Egenera</option>
                <option>Exanet</option>
                <option>HP-UX</option>
                <option>IBM VIO Server</option>
                <option>InForm</option>
                <option>NetApp/ONTAP</option>
                <option>OE Linux UEK (5.x, 6.x)</option>
                <option>Open VMS</option>
                <option>RHE Linux (5.x, 6.x)</option>
                <option>Solaris (11.x)</option>
                <option>SuSE (10.x, 11.x)</option>
                <option>Windows 2008</option>
                <option>Windows 2012</option>
              </select>
            </FormField>
            <h5>Volumes</h5>
            <Tiles flush={false}>
              {volumes}
            </Tiles>
            <button onClick={this._onNewVolumeOpen}>Add Volume</button>
          </fieldset>

          <fieldset>
            <legend>Boot</legend>
            <CheckBox id="manageBootOrder" name="manageBootOrder"
              label="Manage boot order"
              checked={serverProfile.manageBootOrder}
              onChange={this._onChange}/>
          </fieldset>

          <fieldset>
            <legend>BIOS/UEFI</legend>
            <CheckBox id="manageBios" name="manageBios"
              label="Manage BIOS"
              checked={serverProfile.manageBios}
              onChange={this._onChange}/>
          </fieldset>

          <fieldset>
            <legend>Advanced</legend>
            <FormField label="Hide unused FlexNICs">
              <RadioButton id="hideYes" name="hideUnusedNics" label="Yes"
                checked={serverProfile.hideUnusedNics}
                onChange={this._onChange} />
              <RadioButton id="hideNo" name="hideUnusedNics" label="No"
                checked={! serverProfile.hideUnusedNics}
                onChange={this._onChange} />
            </FormField>
          </fieldset>

        </FormFields>

        <Footer pad={{vertical: 'medium'}}>
          <span></span>
          <Menu direction="row">
            {actions}
          </Menu>
        </Footer>

        {addConnection}
        {addVolume}
      </Form>
    );
  }
});

module.exports = ServerProfileForm;
