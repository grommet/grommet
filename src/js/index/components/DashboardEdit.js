// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var DashboardStore = require('../stores/DashboardStore');
var DashboardActions = require('../actions/DashboardActions');
var IndexActions = require('../actions/IndexActions');
var Router = require('../../utils/Router');
var Form = require('../../components/Form');
var IndexAggregate = require('../components/IndexAggregate');
var EditIcon = require('../../components/icons/Edit');
var RemoveIcon = require('../../components/icons/Close');
var Link = require('../../components/Link');

var DashboardEdit = React.createClass({

  _onChange: function() {
    this.setState(DashboardStore.getAll());
  },

  _onOk: function (event) {
    event.preventDefault();
    DashboardActions.commitChanges();
    Router.transitionTo('dashboard');
  },

  _onCancel: function (event) {
    event.preventDefault();
    DashboardActions.abandonChanges();
    Router.transitionTo('dashboard');
  },

  _onRemove: function (panel) {
    DashboardActions.removePanel(panel);
  },

  _onDragStart: function(event) {
    this._dragged = event.currentTarget;
    event.dataTransfer.effectAllowed = 'move';
    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    event.dataTransfer.setData("text/html", event.currentTarget);
    var rect = this._dragged.getBoundingClientRect();
    this._placeholder = document.createElement("li");
    this._placeholder.className =
      "dashboard-edit__panel dashboard-edit__panel--placeholder list-item box";
    this._placeholder.style.width = '' + (rect.right - rect.left) + 'px';
    this._placeholder.style.height = '' + (rect.bottom - rect.top) + 'px';
  },

  _onDragEnd: function() {
    this._dragged.style.display = "inline-block";
    this._dragged.parentNode.removeChild(this._placeholder);
    this._placeholder = null;

    // Update state
    var pendingPanels = this.state.pendingPanels.slice(0);
    var from = Number(this._dragged.dataset.index);
    var to = Number(this._over.dataset.index);
    if (from < to) {
      to -= 1;
    }
    pendingPanels.splice(to, 0, pendingPanels.splice(from, 1)[0]);
    DashboardActions.orderPanels(pendingPanels);
  },

  _onDragOver: function(event) {
    event.preventDefault();
    this._dragged.style.display = "none";
    if (event.target.className ===
      "dashboard-edit__panel dashboard-edit__panel--placeholder list-item box") {
      return;
    }
    this._over = event.target;
    event.target.parentNode.insertBefore(this._placeholder, event.target);
  },

  getInitialState: function() {
    return DashboardStore.getAll();
  },

  componentDidMount: function() {
    DashboardActions.startChanging();
    
    DashboardStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DashboardStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var removeHandler = this._onRemove;
    var onDragStart = this._onDragStart;
    var onDragEnd = this._onDragEnd;

    var panels = [];
    if (this.state.pendingPanels) {
      panels = this.state.pendingPanels.map(function (panel, index) {
        return (
          <li key={panel.name} data-index={index}
            className={"dashboard-edit__panel list-item box"}
            draggable="true" onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <div className={"dashboard-edit__panel-controls"}>
              <Link href={Router.makeHref('dashboard-panel-edit', {index: index})}
                className={"dashboard-edit__panel-edit"}>
                <EditIcon className={'dashboard-edit__panel-edit-icon'} />
              </Link>
              <div className={"dashboard-edit__panel-remove"}
                onClick={removeHandler.bind(null, panel)}>
                <RemoveIcon className={'dashboard-edit__panel-remove-icon'} />
              </div>
            </div>
            <IndexAggregate title={panel.name} params={panel.params}
              attribute={panel.attribute} aggregateResult={panel.aggregateResult} />
          </li>
        );
      });
    }

    var buttons = (
      <div>
        <button onClick={this._onOk} className={'primary'}>OK</button>
        <button onClick={this._onCancel}>Cancel</button>
      </div>
    );

    return (
      <Form action={'Edit'} resource={'Dashboard'} buttons={buttons}>
        <div className={"dashboard-edit"}>
          <Link href={Router.makeHref('dashboard-panel-add')}
            className={"dashboard-edit__add-panel"}>+ Add panel</Link>
          <ol className={"dashboard-edit__panels list-inline"}
            onDragOver={this._onDragOver}>
            {panels}
          </ol>
          <RouteHandler />
        </div>
      </Form>
    );
  }

});

module.exports = DashboardEdit;
