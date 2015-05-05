// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Reflux = require('reflux');
var merge = require('lodash/object/merge');
var Index = require('./Index');
var IndexActions = require('../../actions/IndexActions');
var IndexStore = require('../../stores/IndexStore');

var DEFAULT_OPTIONS = {
  category: ['alerts', 'tasks'],
  view: 'table',
  attributes: [
    {attribute: 'status', label: 'Status', index: 0, size: 'small', header: true},
    {attribute: 'name', label: 'Name', index: 1},
    {attribute: 'associatedResourceName', label: 'Resource', index: 2, size: 'medium'},
    {attribute: 'created', label: 'Time', index: 3, timestamp: true, size: 'medium', secondary: true},
    {attribute: 'state', label: 'State', index: 4, size: 'medium', secondary: true}
  ],
  params: {
    sort: 'created:desc',
  }
};

var Activity = React.createClass({

  propTypes: {
    onSelect: React.PropTypes.func
  },

  mixins: [Reflux.ListenerMixin],

  _onQuery: function (query) {
    var options = merge(this.state.data.options, {params: {query: query}});
    IndexActions.getItems(options);
  },

  _onMore: function () {
    console.log('!!! Activity _onMore');
    // do we have more we could show?
    var data = this.state.data;
    if (data.result.count < data.result.total) {
      // get one more page's worth of data
      var options = merge(data.options,
        {params: {count: (data.options.count + data.pageSize)}});
      IndexActions.getItems(options);
    }
  },

  _onIndexChange: function (data) {
    this.setState({data: data});
  },

  getInitialState: function () {
    var data = IndexStore.getInitialState();
    return {data: data};
  },

  componentWillMount: function () {
    IndexActions.setup(DEFAULT_OPTIONS);
  },

  componentDidMount: function () {
    this.listenTo(IndexStore, this._onIndexChange);
  },

  render: function () {
    return (
      <Index
        options={this.state.data.options}
        result={this.state.data.result}
        onQuery={this._onQuery}
        onSelect={this.props.onSelect}
        onMore={this._onMore} />
    );
  }

});

module.exports = Activity;
