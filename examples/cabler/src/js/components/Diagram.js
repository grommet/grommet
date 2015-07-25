// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Split = require('grommet/components/Split');
var Article = require('grommet/components/Article');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Section = require('grommet/components/Section');
var Topology = require('grommet/components/Topology');
var Menu = require('grommet/components/Menu');
var Anchor = require('grommet/components/Anchor');
var Filter = require('./Filter');
var Cables = require('./Cables');

var Diagram = React.createClass({

  propTypes: {
    data: React.PropTypes.object,
    onClose: React.PropTypes.func.isRequired
  },

  _onHome: function (event) {
    event.preventDefault();
    this.props.onClose();
  },

  _onToggleCables: function (event) {
    event.preventDefault();
    if (this.state.showCables) {
      this.props.data.cables.forEach(function (cable) {
        cable.highlight = false;
      });
    }
    this.setState({showCables: ! this.state.showCables});
  },

  _onFilterChange: function () {
    this.forceUpdate();
  },

  getInitialState: function () {
    return {showCables: false};
  },

  _renderTopology: function () {
    var racks;
    var links = [];

    if (this.props.data) {
      racks = this.props.data.racks.map(function (rack) {

        var devices = rack.contents.map(function (device) {

          var slots = device.slots.map(function (slot) {

            var ports = slot.ports.map(function (port) {
              return (
                <Topology.Part key={port.name} label={port.name} status="disabled"
                  id={port.id} align="center" />
              );
            });

            return (
              <Topology.Part key={slot.name} label={slot.name}>
                {ports}
              </Topology.Part>
            );
          });

          return (
            <Topology.Part key={device.name} label={device.name} direction="row">
              <Topology.Part />
              <Topology.Parts direction="column">
                {slots}
              </Topology.Parts>
              <Topology.Part />
            </Topology.Part>
          );
        });

        return (
          <Topology.Part key={rack.name} direction="column">
            {devices}
          </Topology.Part>
        );
      });

      links = this.props.data.cables;
      if (this.props.data.nodes.filter(function (node) {
        return node.highlight;
      }).length > 0) {
        // filter out unhighlighted cables
        links = links.filter(function (cable) {
          return cable.node.highlight;
        });
      }
      if (this.props.data.cables.filter(function (cable) {
        return cable.highlight;
      }).length > 0) {
        // filter out unhighlighted cables
        links = links.filter(function (cable) {
          return cable.highlight;
        });
      }
    }

    return (
      <Topology links={links} linkOffset={72}>
        <Topology.Parts direction="row">
          {racks}
        </Topology.Parts>
      </Topology>
    );
  },

  render: function() {
    var topology = this._renderTopology();

    var cablesControl;
    var cables;
    if (this.state.showCables) {
      cables = (
        <Cables cables={this.props.data.cables} onClose={this._onToggleCables}
          onChange={this._onFilterChange} />
      );
    } else {
      cablesControl = <Anchor href="" onClick={this._onToggleCables}>Cables</Anchor>;
    }

    return (
      <Split flex="left" separator={true}>
        <Article>
          <Header pad={{horizontal: "medium"}} justify="between">
            <Title onClick={this._onHome}>HP 3Par Storage Cabling</Title>
            <Menu inline={true} direction="row" align="center">
              <Filter data={this.props.data} onChange={this._onFilterChange} />
              {cablesControl}
            </Menu>
          </Header>
          <Section pad={{horizontal: "medium"}}>
            {topology}
          </Section>
        </Article>
        {cables}
      </Split>
    );
  }

});

module.exports = Diagram;
