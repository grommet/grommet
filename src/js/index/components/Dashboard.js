// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var DashboardStore = require('../stores/DashboardStore');
var DashboardActions = require('../actions/DashboardActions');
var IndexActions = require('../actions/IndexActions');
var IndexAggregate = require('../components/IndexAggregate');
var IndexRouter = require('../utils/IndexRouter');
var Router = require('../../utils/Router');
var EditIcon = require('../../components/icons/Edit');
var Link = require('../../components/Link');

var Dashboard = React.createClass({

  _onChange: function () {
    this.setState(DashboardStore.getAll());
  },

  _onSearch: function (searchText, category) {
    var route = IndexRouter.categoryRoute(category);
    Router.transitionTo(route, {}, {'search': searchText});
  },

  getInitialState: function () {
    return DashboardStore.getAll();
  },

  componentWillMount: function () {
    DashboardActions.setup(this.props.configuration);
  },

  componentDidMount: function () {
    this.state.panels.forEach(function (panel) {
      IndexActions.getAggregates(panel.params, [panel.attribute.name], panel.name);
    });
    DashboardStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    DashboardStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var panels = this.state.panels.map(function (panel) {
      var href = IndexRouter.categoryHref(panel.params.category);
      var title = (
        <Link href={href}>{panel.name}</Link>
      );

      return (
        <li key={panel.name} className={"dashboard__panel list-item box"}>
          <IndexAggregate title={title}
            category={panel.params.category}
            attribute={panel.attribute}
            search={panel.params.search}
            aggregateResult={panel.aggregateResult}
            onSearch={this._onSearch} />
        </li>
      );
    }, this);

    return (
      <div className={"dashboard"}>
        <ol className={"dashboard__panels list-inline"}>
          {panels}
        </ol>
        <div className={"dashboard__edit"}>
          <Link href={Router.makeHref("dashboard-edit")}>
            <EditIcon className={'dashboard__edit-icon'} />
          </Link>
        </div>
      </div>
    );
  }

});

module.exports = Dashboard;
