// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var DashboardStore = require('../stores/DashboardStore');
var DashboardActions = require('../actions/DashboardActions');
var Router = require('../../utils/Router');
var Form = require('../../components/Form');
var IndexAggregate = require('../components/IndexAggregate');

var DashboardPanelAdd = React.createClass({

  _onChange: function() {
    this.setState({dashboard: DashboardStore.getAll()});
  },

  _onClick: function (index) {
    this.setState({selectedIndex: index});
  },

  _onAdd: function (event) {
    event.preventDefault();
    DashboardActions.addPanel(
      this.state.dashboard.availablePanels[this.state.selectedIndex]);
    Router.transitionTo('dashboard-edit');
  },

  _onAddPlus: function (event) {
    event.preventDefault();
    DashboardActions.addPanel(
      this.state.dashboard.availablePanels[this.state.selectedIndex]);
  },

  _onCancel: function (event) {
    event.preventDefault();
    Router.transitionTo('dashboard-edit');
  },

  getInitialState: function() {
    return {selectedIndex: 0, dashboard: DashboardStore.getAll()};
  },

  componentDidMount: function() {
    DashboardStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DashboardStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var clickHandler = this._onClick;
    var selectedIndex = this.state.selectedIndex;
    var panels = this.state.dashboard.availablePanels.map(function (panel, index) {
      var classes = ["dashboard-panel-add__panel", "list-item", "box"];
      if (index === selectedIndex) {
        classes.push("dashboard-panel-add__panel--selected");
      }
      return (
        <li key={panel.name} className={classes.join(' ')}
          onClick={clickHandler.bind(null, index)}>
          <IndexAggregate title={panel.name} params={panel.params}
            attribute={panel.attribute} aggregateResult={panel.aggregateResult} />
        </li>
      );
    });

    var buttons = (
      <div>
        <button onClick={this._onAdd} className={'primary'}>Add</button>
        <button onClick={this._onAddPlus}>Add +</button>
        <button onClick={this._onCancel}>Cancel</button>
      </div>
    );

    return (
      <Form action={'Add Panel'} resource={'Dashboard'} onSubmit={this._onSubmit}
        buttons={buttons}>
        <div className={"dashboard-panel-add"}>
          <ol className={"dashboard-panel-add__panels list-inline"}>
            {panels}
          </ol>
        </div>
      </Form>
    );
  }

});

module.exports = DashboardPanelAdd;
