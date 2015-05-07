// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Header = require('grommet/components/Header');
var IndexDonut = require('grommet/components/index/IndexDonut');
var IndexHistory = require('grommet/components/index/IndexHistory');
var IndexQuery = require('grommet/utils/IndexQuery');

var CONFIG = [
  {
    name: 'Active Alerts',
    type: 'donut',
    params: {
      category: 'alerts',
      query: IndexQuery.create('state:active'),
      attribute: 'status'
    }
  },
  {
    name: 'Servers',
    type: 'donut',
    params: {
      category: 'server-hardware',
      attribute: 'model'
    }
  },
  {
    name: 'Tasks',
    type: 'chart',
    params: {
      category: 'tasks',
      attribute: 'status',
      interval: 'days',
      count: 20
    }
  }
];

var TourDashboard = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {tiles: CONFIG};
  },

  render: function () {

    var tiles = this.state.tiles.map(function (tile) {
      if ('donut' === tile.type) {
        return (
          <Tile key={tile.name}>
            <Header><h3>{tile.name}</h3></Header>
            <IndexDonut params={tile.params} />
          </Tile>
        );
      } else if ('chart' === tile.type) {
        return (
          <Tile key={tile.name} wide={true}>
            <Header><h3>{tile.name}</h3></Header>
            <IndexHistory params={tile.params} />
          </Tile>
        );
      }
    }, this);

    return (
      <Tiles fill={true} flush={false}>
        {tiles}
      </Tiles>
    );
  }

});

module.exports = TourDashboard;
