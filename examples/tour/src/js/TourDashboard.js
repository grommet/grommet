// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Dashboard = require('grommet/components/Dashboard');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Header = require('grommet/components/Header');
var Donut = require('grommet/components/Donut');
var Chart = require('grommet/components/Chart');
var Rest = require('grommet/utils/Rest');
var SessionActions = require('grommet/actions/SessionActions');

var CONFIG = [
  {
    name: 'Active Alerts',
    type: 'donut',
    params: {
      category: 'alerts',
      query: 'state:active',
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
    name: 'Alert History',
    type: 'chart',
    params: {
      category: 'alerts',
      attribute: 'status',
      query: 'status:error status:warning',
      interval: 'days',
      count: 20
    }
  }
];

var STATUS_IMPORTANCE = {
  'Error': 1,
  'Critical': 1,
  'Warning': 2,
  'OK': 3,
  'Disabled': 4,
  'Unknown': 5
};

var TourDashboard = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _onClick: function (tile, value) {
    console.log('!!! TourDashboard _onClick', tile.params, value);
    // TODO: this.context.router.transitionTo()
  },

  _onDonutResponse: function (err, res, tile) {
    if (err && err.timeout > 1000) {
      // ignore for now
    } else if (res.status === 400) {
      SessionActions.logout();
    } else if (!res.ok) {
      this.setState({error: res.body || res.text, data: {}});
    } else {
      var series = res.body[0].counts.map(function(count, index) {
        var colorIndex = 'graph-' + (index + 1);
        if ('status' === tile.params.attribute) {
          colorIndex = count.value.toLowerCase();
        }
        return {label: count.value, value: count.count, colorIndex: colorIndex,
          onClick: this._onClick.bind(this, tile, count.value)};
      }, this);
      if ('status' === tile.params.attribute) {
        // re-order by importance
        series.sort(function (s1, s2) {
          return (STATUS_IMPORTANCE[s1.label] - STATUS_IMPORTANCE[s2.label]);
        });
      }
      var state = {};
      state[tile.name] = {series: series};
      this.setState(state);
    }
  },

  _onChartResponse: function (err, res, tile) {
    if (err && err.timeout > 1000) {
      // ignore for now
    } else if (res.status === 400) {
      SessionActions.logout();
    } else if (!res.ok) {
      this.setState({error: res.body || res.text, data: {}});
    } else {
      var xAxis = [];
      var series = res.body[0].counts.map(function(count, index) {
        var values = count.intervals.map(function (interval) {
          var date = new Date(Date.parse(interval.start));
          if (0 === index) {
            xAxis.push((date.getMonth() + 1) + '/' + date.getDate());
          }
          return [date, interval.count];
        });
        var colorIndex = 'graph-' + index;
        if ('status' === tile.params.attribute) {
          colorIndex = count.value.toLowerCase();
        }
        return {label: count.value, values: values, colorIndex: colorIndex};
      });
      var state = {};
      state[tile.name] = {series: series, xAxis: xAxis};
      this.setState(state);
    }
  },

  _getData: function () {
    this.state.tiles.forEach(function (tile) {
      if ('donut' === tile.type) {
        Rest.get('/rest/index/resources/aggregated',
          tile.params,
          function (err, res) {
            this._onDonutResponse(err, res, tile);
          }.bind(this));
      } else if ('chart' === tile.type) {
        Rest.get('/rest/index/resources/aggregated',
          tile.params,
          function (err, res) {
            this._onChartResponse(err, res, tile);
          }.bind(this));
      }
    }, this);
  },

  getInitialState: function () {
    return {tiles: CONFIG};
  },

  componentWillMount: function () {
    this._getData();
  },

  render: function () {

    var tiles = this.state.tiles.map(function (tile) {
      var state = this.state[tile.name] || {};

      if ('donut' === tile.type) {
        return (
          <Tile key={tile.name}>
            <Header><h3>{tile.name}</h3></Header>
            <Donut series={state.series || []} legend={true} />
          </Tile>
        );
      } else if ('chart' === tile.type) {

        return (
          <Tile key={tile.name} wide={true}>
            <Header><h3>{tile.name}</h3></Header>
            <Chart series={state.series || []}
              xAxis={state.xAxis || []}
              legend={true}
              type="bar" threshold={10} />
          </Tile>
        );
      }
    }, this);

    return (
      <Dashboard>
        <Tiles fill={true} flush={false}>
          {tiles}
        </Tiles>
      </Dashboard>
    );
  }

});

module.exports = TourDashboard;
