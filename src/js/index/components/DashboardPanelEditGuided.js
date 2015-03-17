// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var React = require('react');
var DashboardStore = require('../stores/DashboardStore');
var DashboardActions = require('../actions/DashboardActions');
var Form = require('../../components/Form');

var DashboardPanelEditGuided = React.createClass({

  _onChange: function (event) {
    var panel = {
      name: this.refs.name.getDOMNode().value,
      params: {
        category: this.refs.category.getDOMNode().value,
        search: this.refs.search.getDOMNode().value
      },
      attribute: this.refs.attribute.getDOMNode().value,
    }
    DashboardActions.editPanel(panel);
  },

  getInitialState: function() {
    var data = DashboardStore.getAll();
    return({categories: data.categories});
  },

  render: function() {
    var config = {params: {}};
    if (this.props.pendingPanel) {
      config = this.props.pendingPanel.config;
    }

    var options = this.state.categories.map(function (category) {
      return (
        <option>{category}</option>
      );
    });

    var search = '';
    if (config.params.search) {
      search = config.params.search.fullText;
    }

    return (
      <fieldset className={'dashboard-panel-edit-guided form__fields'}>
        <div className={'form__field'}>
          <label htmlFor={'name'}>Name</label>
          <input ref={'name'} id={'name'} value={config.name}
            onChange={this._onChange} />
        </div>
        <div className={'form__field'}>
          <label htmlFor={'category'}>Category</label>
          <select ref={'category'} id={'category'}
            value={config.params.category}
            onChange={this._onChange}>
            {options}
          </select>
        </div>
        <div className={'form__field'}>
          <label htmlFor={'search'}>Filter</label>
          <textarea ref={'search'} id={'search'} value={search}
            onChange={this._onChange} />
        </div>
        <div className={'form__field'}>
          <label htmlFor={'attribute'}>Attribute</label>
          <select ref={'attribute'} id={'attribute'}
            onChange={this._onChange}>
            <option>{config.attribute}</option>
          </select>
        </div>
      </fieldset>
    );
  }

});

module.exports = DashboardPanelEditGuided;
