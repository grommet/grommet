// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var React = require('react');
var ResourceStore = require('../stores/ResourceStore');
var IndexActions = require('../actions/IndexActions');
var IndexRouter = require('../utils/IndexRouter');
var Link = require('../../components/Link');
var StatusIcon = require('../../components/icons/Status');

function buildNodes(nodes, categoryName) {
  return nodes.map(function (node) {
    if (node.total) {
      // aggregate
      var statuses = [];
      _.forOwn(node.status, function (value, name) {
        statuses.push(
          <li key={name} className={'list-item'}>
            <div className={'resource-map__node-status'}>
              <StatusIcon value={name.toLowerCase()}  small="true" />
            </div>
            <div className={'resource-map__node-count'}>
              {value}
            </div>
          </li>
        );
      });
      return (
        <li key={node.uri} className={'resource-map__node list-item'}>
          <ul className={'list-inline'}>
            {statuses}
          </ul>
        </li>
      );
    } else {
      var statusComponent = '';
      if (node.status) {
        statusComponent = (
          <div className={'resource-map__node-status'}>
            <StatusIcon value={node.status.toLowerCase()} small="true" />
          </div>
        );
      }
      return (
        <li key={node.uri} className={'resource-map__node list-item'}>
          <Link href={IndexRouter.resourceHref(categoryName, node.uri)}>
            {statusComponent}
            <div className={'resource-map__node-name'}>
              {node.name}
            </div>
          </Link>
        </li>
      );
    }
  });
}

function buildCategories(categories) {
  var result = [];
  _.forOwn(categories, function (value, name) {
    result.push(
      <li key={name} className={'resource-map__category list-item'}>
        <div className={'resource-map__category-name'}>
          {IndexRouter.categoryLabel(name)}
        </div>
        <ul className={'resource-map__category-nodes list-inline'}>
          {buildNodes(value, name)}
        </ul>
      </li>
    );
  });
  return result;
}

var ResourceMap = React.createClass({

  _onChange: function() {
    var data = ResourceStore.getAll();
    if (data.uri === this.props.uri) {
      this.setState(data);
    }
  },

  getInitialState: function() {
    return ResourceStore.getAll();
  },

  componentDidMount: function() {
    ResourceStore.addChangeListener(this._onChange);
    // get data
    if (this.props.uri) {
      IndexActions.getResourceMap(this.props.uri);
    }
  },

  componentWillUnmount: function() {
    ResourceStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var categories = [];
    if (this.state.treesAggregated.categories) {
      var treeCategories = this.state.treesAggregated.categories;
      categories = buildCategories(this.state.treesAggregated.categories);
    }
    return (
      <div className={'resource-map'}>
        <ol className={'resource-map__categories list-bare'}>
          {categories}
        </ol>
      </div>
    );
  }

});

module.exports = ResourceMap;
