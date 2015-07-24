// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var FilterIcon = require('grommet/components/icons/Filter');
var Menu = require('grommet/components/Menu');
var CheckBox = require('grommet/components/CheckBox');

var Filter = React.createClass({

  _onChange: function () {
    // TODO
  },

  render: function() {
    return (
      <Menu icon={<FilterIcon />}
        dropAlign={{right: 'right'}} pad="medium"
        direction="column" closeOnClick={false}>
        <h4>Nodes</h4>
        <CheckBox id="nodes-all"
          label="All"
          checked={true}
          onChange={this._onChange} />
        <CheckBox id="nodes-0"
          label="0"
          checked={false}
          onChange={this._onChange} />
        <CheckBox id="nodes-1"
          label="1"
          checked={false}
          onChange={this._onChange} />

        <h4>Ports</h4>
        <CheckBox id="ports-all"
          label="All"
          checked={true}
          onChange={this._onChange} />
        <CheckBox id="ports-1"
          label="DP-1"
          checked={false}
          onChange={this._onChange} />
        <CheckBox id="ports-2"
          label="DP-2"
          checked={false}
          onChange={this._onChange} />
      </Menu>
    );
  }

});

module.exports = Filter;
