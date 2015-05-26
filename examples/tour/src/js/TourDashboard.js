// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var merge = require('lodash/object/merge');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Search = require('grommet/components/Search');
var TourSessionMenu = require('./TourSessionMenu');
var Layer = require('grommet/components/Layer');
var Logo = require('./MediumLogo');
var TourMain = require('./TourMain');
var IndexMeter = require('grommet/components/index/IndexMeter');
var IndexHistory = require('grommet/components/index/IndexHistory');
var IndexQuery = require('grommet/utils/IndexQuery');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');
var Link = require('react-router').Link;

var CONFIG = [
  {
    history: true,
    type: 'area',
    wide: true,
    params: {
      category: 'tasks',
      attribute: 'status',
      interval: 'days',
      count: 8
    }
  },
  {
    name: 'TourDashboard.activeAlerts',
    route: 'activity',
    type: 'arc',
    params: {
      category: 'alerts',
      query: IndexQuery.create('state:Active'),
      attribute: 'status'
    }
  },
  {
    name: 'TourDashboard.servers',
    route: 'servers',
    type: 'arc',
    params: {
      category: 'server-hardware',
      attribute: 'model'
    }
  }
];

var TourDashboard = React.createClass({

  mixins: [IntlMixin],

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _onOverTitle: function () {
    this.setState({mainPeek: true});
  },

  _onOutTitle: function () {
    this.setState({mainPeek: false});
  },

  _onClickTitle: function () {
    this.setState({mainActive: true});
  },

  _onCloseMain: function () {
    this.setState({mainActive: false});
  },

  _onClickSegment: function (tile, query) {
    this.context.router.transitionTo(tile.route, {}, {q: query.fullText});
  },

  _onResize: function () {
    // debounce
    clearTimeout(this._timer);
    this._timer = setTimeout(function () {
      // set wide chart count according to the space we have
      var count = Math.round(Math.max(4, window.innerWidth / 48));
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
    return {tiles: CONFIG, mainActive: false, mainPeek: false};
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

    var tiles = this.state.tiles.map(function (tile, index) {

      var header = null;
      if (tile.route) {
        var queryParams = {};
        if (tile.params.query) {
          queryParams.q = tile.params.query.fullText;
        }
        header = (
          <Link to={tile.route} query={queryParams}>
            {this.getIntlMessage(tile.name)}
          </Link>
        );
      } else if (tile.name) {
        header = this.getIntlMessage(tile.name);
      }
      if (header) {
        header = <Header small={true}><h4>{header}</h4></Header>;
      }

      var contents = null;
      if (tile.history) {
        contents = <IndexHistory params={tile.params} type={tile.type}
          small={true} smooth={true} />;
      } else {
        contents = <IndexMeter params={tile.params} type={tile.type}
          onClick={function (query) {
            this._onClickSegment(tile, query);
          }.bind(this)} />;
      }

      return (
        <Tile key={index} wide={tile.wide}>
          {header}
          {contents}
        </Tile>
      );
    }, this);

    var main = (
      <Layer align="left" flush={true}
        hidden={! this.state.mainActive} peek={this.state.mainPeek}
        onClose={this._onCloseMain}>
        <TourMain primary={false} onClose={this._onCloseMain} />
      </Layer>
    );

    return (
      <div>
        <Header fixed={true} flush={false} primary={true} large={true}>
          <span>
            <span onMouseOver={this._onOverTitle}
              onMouseOut={this._onOutTitle}>
              <Title onClick={this._onClickTitle}>
                <Logo />
                <span>Medium App</span>
              </Title>
            </span>
            <Search ref="search" inline={true} />
          </span>
          <TourSessionMenu align="right"/>
        </Header>
        <Tiles fill={true} flush={false}>
          {tiles}
        </Tiles>
        {main}
      </div>
    );
  }

});

module.exports = TourDashboard;
