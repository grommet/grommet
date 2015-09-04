// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var merge = require('lodash/object/merge');
var Split = require('grommet/components/Split');
var Index = require('grommet/components/index/Index');
var IndexQuery = require('grommet/utils/IndexQuery');
var Rest = require('grommet/utils/Rest');
var Actions = require('grommet/actions/Actions');
var Title = require('grommet/components/Title');
var Logo = require('./MediumLogo');
var AddIcon = require('grommet/components/icons/Add');

var MediumIndex = React.createClass({

  propTypes: {
    addRoute: React.PropTypes.string,
    manageData: React.PropTypes.bool,
    resourceRoute: React.PropTypes.string,
    selectionRoute: React.PropTypes.string,
    options: React.PropTypes.shape({
      label: React.PropTypes.string,
      attributes: React.PropTypes.arrayOf(React.PropTypes.shape({
        attribute: React.PropTypes.string,
        header: React.PropTypes.bool,
        index: React.PropTypes.number,
        label: React.PropTypes.string,
        size: React.PropTypes.string,
        timestamp: React.PropTypes.bool
      })),
      view: React.PropTypes.oneOf(["table", "tiles", "list"]),
      params: React.PropTypes.shape({
        category: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.arrayOf(React.PropTypes.string)
        ]),
        query: React.PropTypes.object
      })
    }),
    onMain: React.PropTypes.func
  },

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    var options = this.props.options;
    var queryText = this.context.router.getCurrentQuery().q;
    if (queryText) {
      options = merge(this.props.options,
        {params: {query: IndexQuery.create(queryText)}});
    }
    var state = {
      options: options,
      selection: null
    };
    if (this.props.manageData) {
      state.result = {};
    }
    return state;
  },

  componentWillMount: function () {
    this._setSelectionFromLocation();
  },

  componentDidMount: function () {
    if (this.props.manageData) {
      this._getData();
    }
  },

  componentWillReceiveProps: function () {
    this._setSelectionFromLocation();
  },

  _onSelect: function (selection) {
    var router = this.context.router;
    // if we've already selected something, use the same route we are using now
    var route = this.props.selectionRoute;
    var routes = this.context.router.getCurrentRoutes();
    if (routes.length >= 5) {
      route = routes[4].name;
    }
    router.transitionTo(route, {splat: selection},
      router.getCurrentQuery());
  },

  // only called when this.props.manageData is true
  _onResponse: function (err, res) {
    if (err && err.timeout > 1000) {
      this.setState({error: 'Timeout', result: {}});
    } else if (res.status === 400) {
      Actions.logout();
    } else if (!res.ok) {
      this.setState({error: res.body || res.text, result: {}});
    } else {
      var result = res.body;
      this.setState({result: result, error: null});
    }
  },

  // only called when this.props.manageData is true
  _getData: function () {
    var params = merge({}, this.state.options.params);
    if (params.query && (typeof params.query === 'object')) {
      params.query = params.query.fullText;
    }
    Rest.get('/rest/index/resources', params).end(this._onResponse);
  },

  // only called when this.props.manageData is true
  _onMore: function () {
    // do we have more we could show?
    var result = this.state.result;
    if (result.count < result.total) {
      // get one more page's worth of data
      var params = this.state.options.params;
      params = merge({}, params,
        {count: (params.count + (this.state.options.pageSize || 20))});
      Rest.get('/rest/index/resources', params).end(this._onResponse);
    }
  },

  _onQuery: function (query) {
    var options = merge(this.state.options, {params: {query: query}});
    var getData;
    if (this.props.manageData) {
      getData = this._getData;
    }
    this.setState({options: options}, getData);
    var path = this.context.router.getCurrentPathname();
    this.context.router.replaceWith(path, {}, {q: query.fullText});
  },

  _setSelectionFromLocation: function () {
    var router = this.context.router;
    if (router.isActive(this.props.resourceRoute)) {
      this.setState({selection: router.getCurrentParams().splat});
    } else {
      this.setState({selection: undefined});
    }
  },

  _onResponsive: function (responsive) {
    this.setState({responsive: responsive});
    if ('multiple' === responsive) {
      this.setState({showMain: true});
    }
    if ('single' === responsive) {
      this.setState({showMain: false});
    }
  },

  _renderIndex: function (navControl, addControl) {
    var onMore;
    if (this.props.manageData) {
      onMore = this._onMore;
    }
    return (
      <Index
        options={this.state.options}
        result={this.state.result}
        selection={this.state.selection}
        flush={false}
        onSelect={this._onSelect}
        onQuery={this._onQuery}
        onMore={onMore}
        addControl={addControl}
        navControl={navControl} />
    );
  },

  render: function () {
    var navControl = null;
    if (this.props.onMain) {
      navControl = (
        <Title onClick={this.props.onMain}>
          <Logo />
        </Title>
      );
    }

    var addControl = null;
    if (this.props.addRoute) {
      addControl = <Link to={this.props.addRoute}><AddIcon /></Link>;
    }

    var resourceRouted = this.context.router.getCurrentRoutes().length >= 4;
    var pane1;
    var pane2;

    if ('single' === this.state.responsive) {
      if (resourceRouted) {
        pane1 = <RouteHandler />;
      } else {
        pane1 = this._renderIndex(navControl, addControl);
      }
    } else {
      pane1 = this._renderIndex(navControl, addControl);
      if (resourceRouted) {
        pane2 = <RouteHandler />;
      }
    }

    return (
      <Split onResponsive={this._onResponsive} flex="right">
        {pane1}
        {pane2}
      </Split>
    );
  }

});

module.exports = MediumIndex;
