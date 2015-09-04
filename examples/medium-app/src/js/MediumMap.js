// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Reflux = require('reflux');
var forOwn = require('lodash/object/forOwn');
var GrommetMap = require('grommet/components/Map');
var Link = require('react-router').Link;
var StatusIcon = require('grommet/components/icons/Status');
var IndexActions = require('grommet/actions/IndexActions');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');

var MediumMap = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  mixins: [Reflux.ListenerMixin, IntlMixin],

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
    var uri = router.getCurrentParams().splat;
    if (uri !== this.state.uri) {
      this.setState({uri: uri}, this._getData);
    }
  },

  _onGetMapCompleted: function (response) {
    var router = this.context.router;
    // require Routes lazily to avoid a circular dependency
    var Routes = require('./Routes');
    var categories = [];

    // convert to Map data format
    forOwn(response.categories, function (contents, name) {
      var items = contents.map(function (resource) {
        if (resource.hasOwnProperty('name')) {
          // single resource
          var path = Routes.resourcePath(router, name, resource.uri, 'map');
          return {
            name: resource.name,
            uri: resource.uri,
            status: resource.status,
            path: path
          };
        } else {
          // aggregate summary
          return {
            name: '' + resource.total +
              ' ' + (Routes.categoryLabel(name) || name),
            uri: resource.uri, // for link drawing
            status: resource.status
          };
        }
      }, this);

      categories.push({
        name: name,
        label: this.getGrommetIntlMessage(Routes.categoryLabel(name) || name),
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
    IndexActions.getMap(this.state.uri, true);
  },

  _renderItem: function (item) {
    var node;
    if (typeof item.status === 'object') {
      // summary node
      var statuses = [];
      forOwn(item.status, function (count, status) {
        statuses.push(
          <span key={status}>
            <StatusIcon value={status.toLowerCase()} small={true} />
            {count}
          </span>
        );
      });
      node = (
        <div key={item.name} id={item.uri}>
          {item.name}
          <div>
            {statuses}
          </div>
        </div>
      );
    } else {
      var status = null;
      if (item.status) {
        status = <StatusIcon value={item.status.toLowerCase()} small={true} />;
      }
      if (item.path) {
        node = (
          <Link key={item.uri} id={item.uri} to={item.path}>
            {status}
            {item.name}
          </Link>
        );
      } else {
        node = (
          <div key={item.uri} id={item.uri}>
            {status}
            {item.name}
          </div>
        );
      }
    }
    return node;
  },

  render: function () {
    var categories = this.state.data.categories.map(function (category) {
      var items = category.items.map(function (item) {
        return {
          id: item.uri,
          node: this._renderItem(item)
        };
      }, this);

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

module.exports = MediumMap;
