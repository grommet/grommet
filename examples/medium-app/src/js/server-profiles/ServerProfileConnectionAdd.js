// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var merge = require('lodash/object/merge');
var Layer = require('grommet/components/Layer');
var Form = require('grommet/components/Form');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Menu = require('grommet/components/Menu');
var CloseIcon = require('grommet/components/icons/Clear');
var Footer = require('grommet/components/Footer');
var FormFields = require('grommet/components/FormFields');
var FormField = require('grommet/components/FormField');
var SearchInput = require('grommet/components/SearchInput');
var RadioButton = require('grommet/components/RadioButton');
var Rest = require('grommet/utils/Rest');

var ServerProfileConnectionAdd = React.createClass({

  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      connection: {
        name: '',
        type: 'Ethernet',
        network: '',
        bandwidth: 2.5,
        port: 'Auto',
        boot: 'Not bootable'
      },
      addedCount: 0,
      primaryAction: 'Add',
      networkSuggestions: []
    };
  },

  componentDidMount: function () {
    this._onNetworkSearch('');
    this.refs.first.getDOMNode().focus();
  },

  _onAdd: function (event) {
    event.preventDefault();
    this.props.onAdd(merge({}, this.state.connection));
    this.setState({primaryAction: 'Add'});
    this.props.onClose();
  },

  _onAddPlus: function (event) {
    event.preventDefault();
    var connection = this.state.connection;
    this.props.onAdd(merge({}, connection));
    connection.name = '';
    connection.network = '';
    this.setState({
      primaryAction: 'Add +',
      connection: connection,
      addedCount: this.state.addedCount + 1
    });
  },

  _onChange: function (event) {
    var name = event.target.getAttribute('name');
    var connection = this.state.connection;
    connection[name] = event.target.value;
    var getSuggestions;
    if ('type' === name) {
      getSuggestions = this._onNetworkSearch;
    }
    this.setState({connection: connection}, getSuggestions);
  },

  _onNetworkChange: function (value) {
    var connection = this.state.connection;
    connection.network = value;
    this.setState({connection: connection});
  },

  _onNetworkSearchResponse: function (err, res) {
    if (err) {
      throw err;
    }

    if (res.ok) {
      var names = res.body.map(function (item) {
        return item.name;
      });
      this.setState({networkSuggestions: names});
    }
  },

  _onNetworkSearch: function (value) {
    var category;
    if ('Ethernet' === this.state.connection.type) {
      category = 'ethernet-networks';
    } else {
      category = 'fc-networks';
    }
    var params = {category: category, query: value,
      start: 0, count: 5};
    Rest.get('/rest/index/search-suggestions', params)
      .end(this._onNetworkSearchResponse);
  },

  render: function () {
    var connection = this.state.connection;

    var actions = [];
    if ('Add' === this.state.primaryAction) {
      actions.push(<input key="add" type="submit" className="primary" value="Add"
        onClick={this._onAdd} />);
      actions.push(<input key="addp" type="button" value="Add +"
        onClick={this._onAddPlus} />);
    } else {
      actions.push(<input key="add" type="button" value="Add"
        onClick={this._onAdd} />);
      actions.push(<input key="addp" type="submit" className="primary" value="Add +"
        onClick={this._onAddPlus} />);
    }

    var message;
    if (this.state.addedCount) {
      message = '' + this.state.addedCount + ' added';
    }

    return (
      <Layer align="right">
        <Form compact={true} onSubmit={this._onAdd}>
          <Header>
            <Title>Add Connection</Title>
            <Menu>
              <div onClick={this.props.onClose}>
                <CloseIcon />
              </div>
            </Menu>
          </Header>
          <FormFields>
            <fieldset>
              <FormField label="Name" htmlFor="name">
                <input ref="first" id="name" name="name" type="text"
                  value={connection.name}
                  onChange={this._onChange} />
              </FormField>
              <FormField label="Device type">
                <RadioButton name="type" label="Ethernet"
                  checked={connection.type === 'Ethernet'}
                  onChange={this._onChange} />
                <RadioButton name="type" label="Fibre Channel"
                  checked={connection.type === 'Fibre Channel'}
                  onChange={this._onChange} />
              </FormField>
              <FormField label="Network" htmlFor="network">
                <SearchInput id="network" name="network"
                  value={connection.network}
                  suggestions={this.state.networkSuggestions}
                  onChange={this._onNetworkChange}
                  onSearch={this._onNetworkSearch} />
              </FormField>
              <FormField label="Requested bandwidth (Gb/s)" htmlFor="bandwidth">
                <input id="bandwidth" name="bandwidth" type="number"
                  min="0.1" max="10" step="0.1"
                  value={connection.bandwidth}
                  onChange={this._onChange} />
              </FormField>
              <FormField label="Port" htmlFor="port">
                <select id="port" name="port"
                  value={connection.port}
                  onChange={this._onChange}>
                  <option>Auto</option>
                  <option>FlexibleLOM 1:1-a</option>
                  <option>None</option>
                </select>
              </FormField>
            </fieldset>
          </FormFields>
          <Footer>
            <span>{message}</span>
            <Menu direction="left">
              {actions}
            </Menu>
          </Footer>
        </Form>
      </Layer>
    );
  }
});


module.exports = ServerProfileConnectionAdd;
