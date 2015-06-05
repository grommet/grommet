// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var Reflux = require('reflux');
var merge = require('lodash/object/merge');
var IndexActions = require('../actions/IndexActions');

var DEFAULT_PAGE_SIZE = 20;

var DEFAULT_DATA = {
  options: {
    category: null,
    view: 'tiles',
    attributes: [{attribute: 'name', label: 'Name'}],
    pageSize: DEFAULT_PAGE_SIZE,
    params: {
      start: 0,
      count: DEFAULT_PAGE_SIZE,
      //query: null,
      sort: 'name:asc'
      //itemUri: null
    }
  },

  state: 'idle',

  result: {
    items: [],
    start: 0,
    count: 0,
    total: 0,
    unfilteredTotal: 0
  },

  // hash of uri -> index in result.items[]
  uriIndexes: {}
};

var IndexStore = Reflux.createStore({

  _data: merge({}, DEFAULT_DATA),

  init: function () {
    this.listenTo(IndexActions.setup, this._onSetup);
    this.listenTo(IndexActions.setup.completed, this._onSetupCompleted);
    this.listenTo(IndexActions.setup.failed, this._onSetupFailed);
    this.listenTo(IndexActions.cleanup, this._onCleanup);
    this.listenTo(IndexActions.getItems, this._onGetItems);
    this.listenTo(IndexActions.getItems.completed, this._onGetItemsCompleted);
    this.listenTo(IndexActions.getItems.failed, this._onGetItemsFailed);
  },

  _onSetup: function (options) {
    this._data.state = 'changing';
    // set from defaults until response comes
    this._data.options = merge(this._data.options, options);
  },

  _onSetupCompleted: function (options) {
    this._data.options = options;
    this.trigger(this._data);
    IndexActions.getItems(this._data.options.params, true);
  },

  _onSetupFailed: function () {
    // likely didn't have any to get
    this.trigger(this._data);
    IndexActions.getItems(this._data.options.params, true);
  },

  _onCleanup: function () {
    this._data = merge({}, DEFAULT_DATA);
    this.trigger(this._data);
  },

  _onGetItems: function (params) {
    this._data.state = 'changing';
    this._data.options.params = params;
    clearTimeout(this._clearTimer);

    // clear results slowly to avoid jumpiness
    this._clearTimer = setTimeout(function () {
      this._data.result = merge({}, DEFAULT_DATA.result);
      this._data.uriIndexes = {};
      this.trigger(this._data);
    }.bind(this), 500);

    this.trigger(this._data);
  },

  _onGetItemsCompleted: function (response, context, request) {
    this._data.request = request;
    this._data.result = response;
    this._data.error = '';

    // save uri -> index to speed up lookups by uri
    this._data.uriIndexes = {};
    this._data.result.items.forEach(function (item, index) {
      this._data.uriIndexes[item.uri] = index;
    }, this);

    clearTimeout(this._clearTimer);
    this._data.state = 'idle';
    this.trigger(this._data);
  },

  _unescapeSafeHtml: function (text) {
    return text.replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;|&#39;/g, "'");
  },

  _onGetItemsFailed: function (error) {
    this._data.error = this._unescapeSafeHtml(error.response.text);
    clearTimeout(this._clearTimer);
    this._data.state = 'idle';
    this.trigger(this._data);
  },

  getInitialState: function () {
    return this._data;
  }
});

module.exports = IndexStore;
