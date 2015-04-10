// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var NavStore = require('../../stores/NavStore');
var Router = require('../../utils/Router');
var IndexRouter = require('../utils/IndexRouter');
var IndexStore = require('../stores/IndexStore');
var IndexActions = require('../actions/IndexActions');
var IndexHeader = require('../components/IndexHeader');
var IndexResults = require('../components/IndexResults');
var IndexFilter = require('../components/IndexFilter');
var IndexResource = require('../components/IndexResource');
var Search = require('../utils/Search');

var CLASS_ROOT = 'index';

var Index = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _mobileScroll: function () {
    // if we are narrow, scroll down to hide app header above
    var indexElement = this.refs.index.getDOMNode();
    var rect = indexElement.getBoundingClientRect();
    if (window.innerWidth < 720 && rect.top > 0) {
      setTimeout(function () {
        window.scrollTo(0, rect.top);
      }, 100);
    }
  },

  _search: function (searchText, resourceUri) {
    var index = IndexStore.getAll();
    IndexActions.search(Search.create(searchText || ''), resourceUri, index);
  },

  _onIndexChange: function () {
    var index = IndexStore.getAll();
    this.setState({index: index});
  },

  _onNavChange: function () {
    // TODO: Does Index know too much about route configuration here?
    var resourceActive = Router.isActive(this.state.resourceRoute);
    var resourceUri = null;
    if (resourceActive) {
      resourceUri = Router.param('splat');
      this.setState({
        resourceActive: resourceActive,
        resourceUri: resourceUri,
        filterActive: false});
    } else {
      this.setState({resourceActive: false, resourceUri: null});
    }

    // delay to avoid nested dispatches
    clearTimeout(this._navTimer);
    var searchText = Router.queryParam('search') || '';
    if (searchText !== this.state.index.params.search.fullText) {
      this._navTimer = setTimeout(this._search.
        bind(null, searchText, resourceUri), 10);
    }

    this._mobileScroll();
  },

  _onSearch: function (searchText) {
    Router.replaceQueryParam('search', searchText);
    // causes: _onNavChange -> _search -> _onIndexChange
  },

  _onOpenFilter: function () {
    this.setState({filterActive: true, resourceActive: false});
  },

  _onCloseFilter: function () {
    this.setState({filterActive: false});
  },

  _onCloseResource: function () {
    var categoryRoute = IndexRouter.categoryRoute(this.props.category);
    Router.transitionTo(categoryRoute, {}, Router.queryParams());
  },

  getInitialState: function () {
    this._navTimer = null;
    var resourceRoute = IndexRouter.resourceRoute(this.props.category);

    return {
      filterActive: false,
      resourceRoute: resourceRoute,
      resourceActive: Router.isActive(resourceRoute),
      resourceUri: Router.param('splat'),
      index: IndexStore.getAll()
    };
  },

  componentWillMount: function () {
    IndexActions.setContext({
      category: this.props.category,
      view: this.props.view,
      searchMode: this.props.searchMode || 'filters',
      attributes: this.props.attributes
    });
  },

  componentDidMount: function () {
    // get data
    this._search(Router.queryParam('search'), this.state.resourceUri);

    IndexStore.addChangeListener(this._onIndexChange);
    NavStore.addChangeListener(this._onNavChange);

    this._mobileScroll();
  },

  componentWillUnmount: function () {
    clearTimeout(this._navTimer);
    IndexStore.removeChangeListener(this._onIndexChange);
    NavStore.removeChangeListener(this._onNavChange);
  },

  render: function () {
    var classes = [CLASS_ROOT];
    var filterClasses = [CLASS_ROOT + "__filter"];
    var resourceClasses = [CLASS_ROOT + "__resource"];

    if (this.state.filterActive) {
      classes.push(CLASS_ROOT + "--shared");
      filterClasses.push(CLASS_ROOT + "__filter--active");
    }

    if (this.state.resourceActive) {
      classes.push(CLASS_ROOT + "--shared");
      resourceClasses.push(CLASS_ROOT + "__resource--active");
    }

    return (
      <div ref="index" className={classes.join(' ')}>
        <IndexFilter className={filterClasses.join(' ')}
          category={this.props.category}
          search={this.state.index.params.search}
          attributes={this.state.index.attributes}
          active={this.state.filterActive}
          onSearch={this._onSearch}
          onClose={this._onCloseFilter} />

        <div className={CLASS_ROOT + "__content"}>
          <IndexHeader className={CLASS_ROOT + "__header"}
            category={this.props.category}
            index={this.state.index}
            title={IndexRouter.categoryLabel(this.props.category)}
            onSearch={this._onSearch}
            onOpenFilter={this._onOpenFilter}
            filterActive={this.state.filterActive}
            addRoute={this.props.addRoute} />
          <IndexResults className={CLASS_ROOT + "__results"}
            category={this.props.category}
            index={this.state.index}
            resourceActive={this.state.resourceActive}
            onSearch={this._onSearch} />
        </div>

        <IndexResource className={resourceClasses.join(' ')}
          category={this.props.category}
          index={this.state.index}
          uri={this.state.resourceUri}
          onClose={this._onCloseResource} />
      </div>
    );
  }

});

module.exports = Index;
