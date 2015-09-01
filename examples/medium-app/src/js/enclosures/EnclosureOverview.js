// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Link = require('react-router').Link;
var RestWatch = require('grommet/utils/RestWatch');
var Article = require('grommet/components/Article');
var Header = require('grommet/components/Header');
var Section = require('grommet/components/Section');
var Attribute = require('grommet/components/Attribute');
var StatusIcon = require('grommet/components/icons/Status');
var Topology = require('grommet/components/Topology');

var EnclosureOverview = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    var router = this.context.router;
    return {
      uri: router.getCurrentParams().splat,
      enclosure: {}
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
    RestWatch.stop(this._watchEnclosure);
  },

  _onUpdateEnclosure: function (result) {
    this.setState({enclosure: result});
  },

  _onUpdateMap: function (result) {
    this.setState({map: result});
  },

  _getData: function () {
    RestWatch.stop(this._watchEnclosure);
    this._watchEnclosure = RestWatch.start(this.state.uri, null, this._onUpdateEnclosure);
    RestWatch.stop(this._watchMap);
    this._watchMap = RestWatch.start('/rest/index/trees/aggregated' + this.state.uri,
      null, this._onUpdateMap);
  },

  _renderBay: function (index, serverHardware) {
    let status;
    let name;

    if (serverHardware) {
      // require Routes lazily to avoid a circular dependency
      var Routes = require('../Routes');
      var router = this.context.router;

      let path = Routes.resourcePath(router, 'server-hardware', serverHardware.uri, 'overview');

      status = <StatusIcon value={serverHardware.status} small={true} />;
      name = <Link to={path}>{serverHardware.name}</Link>;
    }

    return (
      <Topology.Part key={index} direction="column" justify="start" align="start">
        {status}
        {name}
      </Topology.Part>
    );
  },

  _renderFront: function () {
    let serverHardware = this.state.map.categories['server-hardware'] || [];
    let topBays = [];
    for (let i = 0; i < 8; i += 1) {
      topBays.push(this._renderBay(i, serverHardware[i]));
    }
    let bottomBays = [];
    for (let i = 8; i < 16; i += 1) {
      bottomBays.push(this._renderBay(i, serverHardware[i]));
    }

    return (
      <Topology.Part className="front" direction="column">
        <Topology.Parts direction="row">
          {topBays}
        </Topology.Parts>
        <Topology.Parts direction="row">
          {bottomBays}
        </Topology.Parts>
      </Topology.Part>
    );
  },

  _renderBack: function () {
    // require Routes lazily to avoid a circular dependency
    var Routes = require('../Routes');
    var router = this.context.router;

    var interconnects = this.state.map.categories.switches.map(function (interconnect) {
      let path = Routes.resourcePath(router, 'switches', interconnect.uri, 'overview') || 'switches';
      return (
        <Topology.Part key={interconnect.uri} direction="row" justify="start" align="center">
          <StatusIcon value={interconnect.status} small={true} />
          <Link to={path}>{interconnect.name}</Link>
        </Topology.Part>
      );
    }, this);

    return (
      <Topology.Part className="back" direction="column">
        {interconnects[0]}
        {interconnects[1]}
        <Topology.Parts direction="row">
          <Topology.Part direction="column">
          </Topology.Part>
          <Topology.Part direction="row" justify="center" align="center">
            <StatusIcon value="ok" small={true} />
            <Topology.Label>fan 1</Topology.Label>
          </Topology.Part>
          <Topology.Part direction="row" justify="center" align="center">
            <StatusIcon value="ok" small={true} />
            <Topology.Label>fan 2</Topology.Label>
          </Topology.Part>
          <Topology.Part direction="row" justify="center" align="center">
            <StatusIcon value="ok" small={true} />
            <Topology.Label>fan 3</Topology.Label>
          </Topology.Part>
        </Topology.Parts>
        {interconnects[2]}
        {interconnects[3]}
        <Topology.Parts direction="row">
          <Topology.Part direction="column">
          </Topology.Part>
          <Topology.Part direction="row" justify="center" align="center">
            <StatusIcon value="ok" small={true} />
            <Topology.Label>fan 4</Topology.Label>
          </Topology.Part>
          <Topology.Part direction="row" justify="center" align="center">
            <StatusIcon value="ok" small={true} />
            <Topology.Label>fan 5</Topology.Label>
          </Topology.Part>
          <Topology.Part direction="row" justify="center" align="center">
            <StatusIcon value="ok" small={true} />
            <Topology.Label>fan 6</Topology.Label>
          </Topology.Part>
        </Topology.Parts>
        {interconnects[4]}
        {interconnects[5]}
      </Topology.Part>
    );
  },

  render: function () {
    let enclosure = this.state.enclosure;

    let front;
    let back;
    if (this.state.map) {
      front = this._renderFront();
      back = this._renderBack();
    }

    return (
      <Article>
        <Header pad={{horizontal: 'medium'}}>
          <StatusIcon value={enclosure.status} large={true} />
          {enclosure.name}
        </Header>

        <Section pad="medium">
          <Topology>
            <Topology.Parts direction="column" uniform={true}>
              {front}
              {back}
            </Topology.Parts>
          </Topology>
        </Section>

        <Section pad="medium">
          <Attribute label="Description">
            {enclosure.description}
          </Attribute>
        </Section>

      </Article>
    );
  }
});

module.exports = EnclosureOverview;
