// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var merge = require('lodash/object/merge');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Search = require('grommet/components/Search');
var TourSessionMenu = require('./TourSessionMenu');
var IndexDonut = require('grommet/components/index/IndexDonut');
var IndexHistory = require('grommet/components/index/IndexHistory');
var IndexQuery = require('grommet/utils/IndexQuery');
var Link = require('react-router').Link;

var CONFIG = [
  {
    name: 'Active Alerts',
    route: 'activity',
    type: 'donut',
    params: {
      category: 'alerts',
      query: IndexQuery.create('state:Active'),
      attribute: 'status'
    }
  },
  {
    name: 'Servers',
    route: 'servers',
    type: 'donut',
    params: {
      category: 'server-hardware',
      attribute: 'model'
    }
  },
  {
    name: 'Tasks',
    type: 'chart',
    wide: true,
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

  _onClickSegment: function (tile, query) {
    this.context.router.transitionTo(tile.route, {}, {q: query.fullText});
  },

  _onResize: function () {
    // debounce
    clearTimeout(this._timer);
    this._timer = setTimeout(function () {
      // set wide chart count according to the space we have
      var count = Math.round(Math.max(10, window.innerWidth / 40));
      var tiles = this.state.tiles.map(function (tile) {
        if (tile.wide) {
          return merge(tile, {params: {count: count}});
        } else {
          return tile;
        }
      });
      this.setState({tiles: tiles});
    }.bind(this), 500);
  },

  getInitialState: function () {
    return {tiles: CONFIG};
  },

  componentDidMount: function () {
    this.refs.search.focus();
    window.addEventListener('resize', this._onResize);
    this._onResize();
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this._onResize);
  },

  render: function () {

    var tiles = this.state.tiles.map(function (tile) {

      var header = null;
      if (tile.route) {
        var queryParams = {};
        if (tile.params.query) {
          queryParams.q = tile.params.query.fullText;
        }
        header = (
          <Link to={tile.route} query={queryParams}>
            {tile.name}
          </Link>
        );
      } else {
        header = tile.name;
      }

      var contents = null;
      if ('donut' === tile.type) {
        contents =  <IndexDonut params={tile.params}
          onClick={function (query) {
            this._onClickSegment(tile, query);
          }.bind(this)}/>;
      } else if ('chart' === tile.type) {
        contents = <IndexHistory params={tile.params} />;
      }

      return (
        <Tile key={tile.name} wide={tile.wide}>
          <Header small={true}><h4>{header}</h4></Header>
          {contents}
        </Tile>
      );
    }, this);

    return (
      <div>
        <Header fixed={true} flush={false} primary={true}>
          <span>
            <Title>Grommet Tour</Title>
            <Search ref="search" inline={true} />
          </span>
          <TourSessionMenu />
        </Header>
        <Tiles fill={true} flush={false}>
          {tiles}
        </Tiles>
      </div>
    );
  }

});

module.exports = TourDashboard;
