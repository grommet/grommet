// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Reflux = require('reflux');
var forOwn = require('lodash/object/forOwn');
var GrommetMap = require('grommet/components/Map');
var Link = require('react-router').Link;
var StatusIcon = require('grommet/components/icons/Status');
var IndexActions = require('grommet/actions/IndexActions');

var TourMap = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  mixins: [Reflux.ListenerMixin],

  _onGetMapCompleted: function (response) {
    var router = this.context.router;
    var Routes = require('./Routes');
    var categories = [];

    // convert to Map data format
    forOwn(response.categories, function (category, name) {
      var items = category.map(function (resource) {
        var path = Routes.resourcePath(router, name, resource.uri, 'map');
        return {
          name: resource.name,
          uri: resource.uri,
          status: resource.status,
          path: path
        };
      }, this);

      categories.push({
        name: name,
        label: Routes.categoryLabel(name) || name,
        path: Routes.categoryPath(router, name),
        items: items
      });
    }, this);

    var links = response.links.map(function (link) {
      return {parentId: link.parentUri, childId: link.childUri};
    });

    this.setState({data: {categories: categories, links: links}});
  },

  _getData: function () {
    this.listenTo(IndexActions.getMap.completed, this._onGetMapCompleted);
    IndexActions.getMap(this.state.uri);
  },

  getInitialState: function () {
    return {
      uri: this.context.router.getCurrentParams().splat,
      data: {categories: [], links: []}
    };
  },

  componentDidMount: function () {
    this._getData();
  },

  componentWillReceiveProps: function () {
    var router = this.context.router;
    this.setState({uri: router.getCurrentParams().splat}, this._getData);
  },

  render: function () {
    var categories = this.state.data.categories.map(function (category) {
      var items = category.items.map(function (item) {
        var statusIcon = null;
        if (item.status) {
          statusIcon = <StatusIcon value={item.status.toLowerCase()} small={true} />;
        }
        var node;
        if (item.path) {
          node = (
            <Link key={item.uri} id={item.uri} to={item.path}>
              {statusIcon}
              {item.name}
            </Link>
          );
        } else {
          node = (
            <div key={item.uri} id={item.uri}>
              {statusIcon}
              {item.name}
            </div>
          );
        }
        return {id: item.uri, node: node};
      });

      var label = category.label;
      if (category.path) {
        label = <Link to={category.path}>{label}</Link>;
      }

      return {
        id: category.name,
        label: label,
        items: items
      };
    }, this);

    var data = {
      categories: categories,
      links: this.state.data.links
    };

    return (
      <GrommetMap data={data} />
    );
  }

});

module.exports = TourMap;
