// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var Reflux = require('reflux');
var merge = require('lodash/object/merge');
var IndexActions = require('../actions/IndexActions');

// category key -> {view: , searchMode: , sort: , attributes: }
//var _persistentState = {};

// construct the key to use for _persistentState
//function categoryKey(category) {
//  if (typeof category === 'string') {
//    return category;
//  } else if (Array.isArray(category)) {
//    return category.join(',');
//  }
//}

var IndexStore = Reflux.createStore({

  _data: {

    options: {
      category: null,
      view: 'tiles',
      attributes: [{attribute: 'name', label: 'Name'}],
      params: {
        start: 0,
        count: 20,
        query: null,
        sort: 'name:asc',
        referenceUri: null
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
  },

  init: function () {
    this.listenTo(IndexActions.setup, this._onSetup);
    this.listenTo(IndexActions.setup.completed, this._onSetupCompleted);
    this.listenTo(IndexActions.setup.failed, this._onSetupFailed);
    this.listenTo(IndexActions.getItems, this._onGetItems);
    this.listenTo(IndexActions.getItems.completed, this._onGetItemsCompleted);
    this.listenTo(IndexActions.getItems.failed, this._onGetItemsFailed);
  },

  _onSetup: function (options) {
    this._data.state = 'changing';
    // set from defaults until response comes
    this._data.options = merge(this._data.options, options);

    /* replaced by server persistence
    // get or create persistence
    _persistentState = JSON.parse(localStorage.getItem('IndexStore__state') || '{}');
    var key = categoryKey(defaultParams.category);
    // initialize persistent state if we haven't yet
    if (! _persistentState.hasOwnProperty(key)) {
      _persistentState[key] = {
        options: defaultOptions,
        params: defaultParams
      };
    }

    // set current
    var persistent = _persistentState[key];
    this._data.options = persistent.options;
    this._data.params = persistent.params;
    */
  },

  _onSetupCompleted: function (options) {
    this._data.options = options;
    this.trigger(this._data);
    IndexActions.getItems(this._data.options);
  },

  _onSetupFailed: function () {
    // likely didn't have any to get
    this.trigger(this._data);
    IndexActions.getItems(this._data.options);
  },

  _onGetItems: function (options) {
    this._data.state = 'changing';
    this._data.options = options;
    clearTimeout(this._clearTimer);

    // clear results slowly to avoid jumpiness
    this._clearTimer = setTimeout(function () {
      this._data.result = {
        items: [],
        start: 0,
        count: 0,
        total: 0,
        unfilteredTotal: 0
      };
      this._data.uriIndexes = {};
      this.trigger(this._data);
    }.bind(this), 500);

    this.trigger(this._data);
  },

  _onGetItemsCompleted: function (response) {
    this._data.result = response;

    // save uri -> index to speed up lookups by uri
    this._data.uriIndexes = {};
    this._data.result.items.forEach(function (item, index) {
      this._data.uriIndexes[item.uri] = index;
    }, this);

    clearTimeout(this._clearTimer);
    this._data.state = 'idle';
    this.trigger(this._data);
  },

  _onGetItemsFailed: function () {
    // TODO:
    clearTimeout(this._clearTimer);
    this._data.state = 'idle';
    this.trigger(this._data);
  },

  getInitialState: function () {
    return this._data;
  }
});

module.exports = IndexStore;
