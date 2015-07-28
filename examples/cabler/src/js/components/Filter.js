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
    data: React.PropTypes.object.isRequired
  },

  _onChangeNode: function (node) {
    Actions.toggleNodeHighlight(node);
  },

  _onChangeNodeAll: function () {
    Actions.clearNodeHighlight();
  },

  _onChange: function () {

  },

  _onReset: function (event) {
    event.preventDefault();
    Actions.clearAllHighlights();
  },

  render: function() {
    var nodes = [];
    // don't bother if there's only one node
    if (this.props.data.nodes.length > 1) {
      var checkAll = true;
      for (let i = 0; i < this.props.data.nodes.length; i += 1) {
        let node = this.props.data.nodes[i];
        if (node.highlight) {
          checkAll = false;
        }
        nodes.push(
          <CheckBox id={"node-" + i} key={i}
            label={this.props.data.nodes[i].name}
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

    return (
      <Menu icon={<FilterIcon />}
        dropAlign={{right: 'right'}} pad="none"
        direction="column" closeOnClick={false}>

        <Anchor href="" onClick={this._onReset}>Reset</Anchor>

        <Box pad="medium" direction="column">
          {nodes}

          <h4>Ports</h4>
          <CheckBox id="port-all"
            label="All"
            checked={true}
            onChange={this._onChange} />
          <CheckBox id="port-1"
            label="DP-1"
            checked={false}
            onChange={this._onChange} />
          <CheckBox id="port-2"
            label="DP-2"
            checked={false}
            onChange={this._onChange} />
        </Box>
      </Menu>
    );
  }

});

module.exports = Filter;
