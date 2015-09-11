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
var Actions = require('../actions/Actions');

var Diagram = React.createClass({

  propTypes: {
    data: React.PropTypes.object
  },

  getInitialState: function () {
    return {showCables: false};
  },

  componentDidUpdate: function () {
    // scroll to first link if not visible
    let topologyData = this.props.data.topologyData;
    if (topologyData.links.length > 0) {
      let port = document.getElementById(topologyData.links[0].ids[0]);
      if (port) {
        // TODO:
      }
    }
  },

  _onHome: function (event) {
    event.preventDefault();
    Actions.clearConfiguration();
  },

  _onToggleCables: function (event) {
    event.preventDefault();
    this.setState({showCables: ! this.state.showCables});
  },

  _onResponsive: function (responsive) {
    this.setState({responsive: responsive});
  },

  _renderTopology: function () {
    let topologyData = this.props.data.topologyData;

    let racks = topologyData.racks.map(function (rack) {

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

    return (
      <Topology links={topologyData.links} linkOffset={72}>
        <Topology.Parts direction="row" align="end">
          {racks}
        </Topology.Parts>
      </Topology>
    );
  },

  render: function() {
    let topologyData = this.props.data.topologyData;
    var article;
    if (! this.state.showCables || 'multiple' === this.state.responsive) {
      var cablesControl;
      if (! this.state.showCables) {
        cablesControl = <Anchor href="" onClick={this._onToggleCables}>Cables</Anchor>;
      }
      let topology = this._renderTopology();

      article = (
        <Article>
          <Header pad={{horizontal: "medium"}} justify="between">
            <Title onClick={this._onHome}>{this.props.data.title}</Title>
            <Menu inline={true} direction="row" align="center" responsive={false}>
              <Filter topologyData={topologyData} />
              {cablesControl}
            </Menu>
          </Header>
          <Section pad={{horizontal: "medium"}}>
            {topology}
          </Section>
        </Article>
      );
    }

    var cables;
    if (this.state.showCables) {
      cables = (
        <Cables cables={topologyData.cables} onClose={this._onToggleCables} />
      );
    }

    return (
      <Split flex="left" separator={true} onResponsive={this._onResponsive}>
        {article}
        {cables}
      </Split>
    );
  }

});

module.exports = Diagram;
