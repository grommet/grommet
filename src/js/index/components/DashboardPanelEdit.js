// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var React = require('react');
var DashboardStore = require('../stores/DashboardStore');
var DashboardActions = require('../actions/DashboardActions');
var State = require('react-router').State;
var Router = require('../../utils/Router');
var Form = require('../../components/Form');
var DashboardPanelEditGuided = require('../components/DashboardPanelEditGuided');
var DashboardPanelEditRaw = require('../components/DashboardPanelEditRaw');
var IndexAggregate = require('../components/IndexAggregate');

var DashboardPanelEdit = React.createClass({

  mixins: [State],

  _onChange: function() {
    var data = DashboardStore.getAll();
    this.setState({pendingPanel: data.pendingPanel});
  },

  _onOk: function (event) {
    event.preventDefault();
    var index = this.getParams().index;
    DashboardActions.updatePanel(index);
    Router.transitionTo('dashboard-edit');
  },

  _onCancel: function (event) {
    event.preventDefault();
    Router.transitionTo('dashboard-edit');
  },

  _onChangeMode: function() {
    var mode = this.refs.mode.getDOMNode().value;
    this.setState({mode: mode});
  },

  getInitialState: function() {
    var data = DashboardStore.getAll();
    var index = this.getParams().index;
    return {
      mode: 'guided',
      panel: data.pendingPanels[index] || {},
      pendingPanel: null
    };
  },

  componentDidMount: function() {
    DashboardStore.addChangeListener(this._onChange);
    DashboardActions.editPanel(this.state.panel);
  },

  componentWillUnmount: function() {
    DashboardStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var config = {params: {}};
    if (this.state.pendingPanel) {
      config = this.state.pendingPanel.config;
    }

    var display = '';
    if (config.name) {
      display = (
        <IndexAggregate title={config.name} params={config.params}
          attribute={config.attribute} aggregateResult={config.aggregateResult} />
      );
    }

    var buttons = (
      <div>
        <button onClick={this._onOk} className={'primary'}>OK</button>
        <button onClick={this._onCancel}>Cancel</button>
      </div>
    );

    var mode = this.state.mode;
    var guidedClasses = ["dashboard-panel-edit__guided"];
    var rawClasses = ["dashboard-panel-edit__raw"];
    if ('guided' === mode) {
      guidedClasses.push("dashboard-panel-edit__guided--active");
    } else {
      rawClasses.push("dashboard-panel-edit__raw--active");
    }

    return (
      <Form action={'Edit'} resource={config.name} buttons={buttons}>
        <div className={"dashboard-panel-edit"}>
          <div className={"dashboard-panel-edit__config"}>
            <select ref="mode" className={"dashboard-panel-edit__mode-selector"}
              onChange={this._onChangeMode} value={mode}>
              <option>guided</option>
              <option>raw</option>
            </select>

            <div className={guidedClasses.join(' ')}>
              <DashboardPanelEditGuided pendingPanel={this.state.pendingPanel} />
            </div>
            <div className={rawClasses.join(' ')}>
              <DashboardPanelEditRaw pendingPanel={this.state.pendingPanel} />
            </div>

          </div>
          <div className={"dashboard-panel-edit__display"}>
            {display}
          </div>
        </div>
      </Form>
    );
  }

});

module.exports = DashboardPanelEdit;
