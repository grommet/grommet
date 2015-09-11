// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var FilterIcon = require('grommet/components/icons/Filter');
var Menu = require('grommet/components/Menu');
var Box = require('grommet/components/Box');
var Anchor = require('grommet/components/Anchor');
var CheckBox = require('grommet/components/CheckBox');
var Actions = require('../actions/Actions');

var Filter = React.createClass({

  propTypes: {
    topologyData: React.PropTypes.object.isRequired
  },

  _onChangeNode: function (node) {
    Actions.toggleNodeHighlight(node);
  },

  _onChangeNodeAll: function () {
    Actions.clearAllNodeHighlights();
  },

  _onChangeDataPath: function (dataPath) {
    Actions.toggleDataPathHighlight(dataPath);
  },

  _onChangeDataPathAll: function () {
    Actions.clearAllDataPathHighlights();
  },

  _onReset: function (event) {
    event.preventDefault();
    Actions.clearAllHighlights();
  },

  render: function() {
    let topologyData = this.props.topologyData;
    let nodes = [];
    // don't bother if there's only one node
    if (topologyData.nodes.length > 1) {
      let checkAll = true;
      for (let i = 0; i < topologyData.nodes.length; i += 1) {
        let node = topologyData.nodes[i];
        if (node.highlight) {
          checkAll = false;
        }
        nodes.push(
          <CheckBox id={"node-" + i} key={i}
            label={topologyData.nodes[i].name}
            checked={node.highlight}
            onChange={this._onChangeNode.bind(this, node)} />
        );
      }
      if (nodes.length > 1) {
        nodes.unshift(
          <CheckBox id="node-all" key="all"
            label="All"
            checked={checkAll}
            onChange={this._onChangeNodeAll} />
        );
        nodes.unshift(<h4 key="header">Nodes</h4>);
      }
    }

    let dataPaths = [];
    let checkAll = true;
    for (let i = 0; i < topologyData.dataPaths.length; i += 1) {
      let dataPath = topologyData.dataPaths[i];
      if (dataPath.highlight) {
        checkAll = false;
      }
      dataPaths.push(
        <CheckBox id={"data-path-" + (i + 1)} key={i}
          label={dataPath.name}
          checked={dataPath.highlight}
          onChange={this._onChangeDataPath.bind(this, dataPath)} />
      );
    }
    dataPaths.unshift(
      <CheckBox id="data-path-all" key="all"
        label="All"
        checked={checkAll}
        onChange={this._onChangeDataPathAll} />
    );
    dataPaths.unshift(<h4 key="header">Data Paths</h4>);

    return (
      <Menu icon={<FilterIcon />}
        dropAlign={{right: 'right'}} pad="none"
        direction="column" closeOnClick={false}>

        <Anchor href="" onClick={this._onReset}>Reset</Anchor>

        <Box pad="medium" direction="column">
          {nodes}
          {dataPaths}
        </Box>
      </Menu>
    );
  }

});

module.exports = Filter;
