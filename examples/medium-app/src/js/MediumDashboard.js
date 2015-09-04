// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var merge = require('lodash/object/merge');
var IndexActions = require('grommet/actions/IndexActions');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Header = require('grommet/components/Header');
var Box = require('grommet/components/Box');
var Title = require('grommet/components/Title');
var Search = require('grommet/components/Search');
var MediumSessionMenu = require('./MediumSessionMenu');
var Layer = require('grommet/components/Layer');
var Logo = require('./MediumLogo');
var MediumMain = require('./MediumMain');
var IndexAggregate = require('grommet/components/index/IndexAggregate');
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
      category: 'server-profiles',
      attribute: 'state',
      interval: 'days',
      count: 8
    }
  },
  {
    name: 'Active Alerts',
    route: 'activity',
    type: 'circle',
    params: {
      category: 'alerts',
      query: IndexQuery.create('state:Active'),
      attribute: 'status'
    }
  },
  {
    name: 'Server Profiles',
    route: 'server profiles',
    type: 'circle',
    params: {
      category: 'server-profiles',
      attribute: 'status'
    }
  },
  {
    name: 'Server Hardware',
    route: 'server hardwares',
    type: 'circle',
    params: {
      category: 'server-hardware',
      attribute: 'model'
    }
  },
  {
    name: 'Tasks',
    route: 'activity',
    type: 'distribution',
    params: {
      category: 'tasks',
      attribute: 'name'
    }
  }
];

var MediumDashboard = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  mixins: [IntlMixin],

  getInitialState: function () {
    return {
      tiles: CONFIG,
      legendPlacement: 'bottom',
      mainActive: false,
      mainPeek: false
    };
  },

  componentDidMount: function () {
    this.refs.search.focus();
    window.addEventListener('resize', this._onResize);
    this._onResize();
  },

  componentWillUnmount: function () {
    IndexActions.cleanup();
    window.removeEventListener('resize', this._onResize);
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

  _layout: function () {
    var wideTileCount = 0;
    var normalTileCount = 0;
    // set wide chart count according to the space we have
    var dataPoints = Math.round(Math.max(4, window.innerWidth / 48));
    var tiles = this.state.tiles.map(function (tile) {
      if (tile.wide) {
        wideTileCount += 1;
        return merge(tile, {params: {count: dataPoints}});
      } else {
        normalTileCount += 1;
        return tile;
      }
    });
    this.setState({tiles: tiles});

    // set legend placement
    var width = window.innerWidth;
    var height = window.innerHeight - 100;
    var ratio = width / height;
    if (ratio < 1.1) {
      this.setState({legendPlacement: 'bottom'});
    } else if (ratio > 1.3) {
      this.setState({legendPlacement: 'right'});
    }

    // set graphic size
    // TODO: These numbers are empirical. Redo to be more formal.
    var graphicSize;
    var roughRows = Math.ceil(wideTileCount + (normalTileCount / 3));
    if ((width / 300) < 3) {
      graphicSize = 'small';
    } else if ((height / roughRows) < 300) {
      graphicSize = 'small';
    } else if ((width / 660) > 3) {
      graphicSize = 'large';
    } else if ((height / roughRows) > 400) {
      graphicSize = 'large';
    }

    this.setState({graphicSize: graphicSize});
  },

  _onResize: function () {
    // debounce
    clearTimeout(this._timer);
    this._timer = setTimeout(this._layout, 500);
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
            {this.getGrommetIntlMessage(tile.name)}
          </Link>
        );
      } else if (tile.name) {
        header = this.getGrommetIntlMessage(tile.name);
      }
      if (header) {
        header = <Header tag="h3" small={true} justify="center">{header}</Header>;
      }

      var contents = null;
      if (tile.history) {
        contents = (
          <IndexHistory params={tile.params} type={tile.type}
            smooth={true} size={this.state.graphicSize} />
        );
      } else {
        contents = (
          <IndexAggregate params={tile.params} type={tile.type}
            legend={{placement: this.state.legendPlacement}}
            size={this.state.graphicSize}
            onClick={function (query) {
              this._onClickSegment(tile, query);
            }.bind(this)} />
        );
      }

      return (
        <Tile key={index} wide={tile.wide} pad="medium">
          {header}
          {contents}
        </Tile>
      );
    }, this);

    var main = (
      <Layer align="left" flush={true}
        hidden={! this.state.mainActive} peek={this.state.mainPeek}
        onClose={this._onCloseMain}>
        <MediumMain primary={false} onClose={this._onCloseMain} />
      </Layer>
    );

    return (
      <div>
        <Header direction="row" justify="between" large={true} pad={{horizontal: 'medium'}}>
          <Box direction="row" align="center" responsive={false} className="flex">
            <span onMouseOver={this._onOverTitle}
              onMouseOut={this._onOutTitle}>
              <Title onClick={this._onClickTitle}>
                <Logo />
                <span>Medium App</span>
              </Title>
            </span>
            <Search ref="search" inline={true} className="flex" />
          </Box>
          <MediumSessionMenu dropAlign={{right: 'right'}} />
        </Header>
        <Tiles fill={true} flush={false}>
          {tiles}
        </Tiles>
        {main}
      </div>
    );
  }

});

module.exports = MediumDashboard;
