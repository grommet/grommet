// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Dashboard = require('grommet/components/Dashboard');
var DashboardActions = require('grommet/actions/DashboardActions');
//var IndexActions = require('grommet/actions/IndexActions');
var DashboardStore = require('../stores/DashboardStore');

var configuration = {
  panels: [
    {
      name: 'Alerts',
      params: {
        category: 'alerts',
        search: 'state:Active'
      },
      attribute: {name: 'status'}
    }
  ],
  availablePanels: []
};

var TourDashboard = React.createClass({

  _onStoreChange: function () {
    this.setState(DashboardStore.getAll());
  },

  componentDidMount: function () {
    DashboardActions.setup(configuration);
    DashboardStore.addChangeListener(this._onStoreChange);
  },

  componentWillUnmount: function () {
    DashboardStore.removeChangeListener(this._onStoreChange);
  },

  render: function () {

    var panels = this.state.panels.map(function (panel) {
      return <span>{panel.name}</span>;
      /*
      var href = IndexRouter.categoryHref(panel.params.category);
      var title = (
        <Link href={href}>{panel.name}</Link>
      );

      return (
        <div key={panel.name} className={"dashboard__panel"}>
          <IndexAggregate title={title}
            category={panel.params.category}
            attribute={panel.attribute}
            search={panel.params.search}
            aggregateResult={panel.aggregateResult}
            onSearch={this._onSearch} />
        </div>
      );
      */
    }, this);

    return (
      <Dashboard>
        {panels}
      </Dashboard>
    );
  }

});

module.exports = TourDashboard;
