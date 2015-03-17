// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var AppDispatcher = require('../../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/IndexConstants');
var Search = require('../utils/Search');
var String = require('../utils/String');
var AlphaNum = require('../utils/AlphaNum');

var _persistentState = {}; // category key -> {view: , searchMode: , sort: , attributes: }

var _data = {

  pageSize: 20, //100,

  // defaults will be subsumed by persistent state
  defaults: {
    view: 'table',
    searchMode: 'filters',
    sort: 'name:asc',
    attributes: [{name: 'name', label: 'Name'}] // {name: ,label: }
  },

  view: 'table', // which view to show, 'table' or 'tiles'
  searchMode: 'filters', // which style of search to use
  sort: 'name:asc',
  // each array contains attribute objects containing:
  // {name: , label: , visible: , aggregate: , filter: }
  // aggregate have {filteredAggregateResult: [{value: ,count:}]}
  // filter have {unfilteredAggregateResult: [{value: ,count:}]}
  attributes: [],
  includeActivity: false,

  params: {
    category: null,
    start: 0,
    count: 0,
    // search: {tokens: [{attribute: , value: , text: } or {text: }], fullText: , text: }
    search: Search.create(''),
    sort: 'name:asc'
  },

  // what we receive
  result: {
    members: [],
    start: 0,
    count: 0,
    total: 0,
    unfilteredTotal: 0
  },

  uriIndexes: {}, // hash of uri -> index in result.members[]

  facetedSearchText: '', // different than params.search.fullText because we strip the trailing '<attribute>:'
  facetedSearchSuggestions: []
};

function clearResults() {
  _data.result = {
    params: {},
    members: [],
    start: 0,
    count: 0,
    total: 0,
    unfilteredTotal: 0
  };
  _data.uriIndexes = {};
  _data.attributes.forEach(function (attribute) {
    delete attribute.filteredAggregateResult;
  });
}

// construct the key to use for _persistentState
function categoryKey(category) {
  if (typeof category === 'string') {
    return category;
  } else if (Array.isArray(category)) {
    return category.join(',');
  }
}

// Provides a default context and initializes the state
function setContext(args) {

  // normalize attributes
  if (args.attributes) {
    // normalize attributes
    args.attributes = args.attributes.map(function (attribute, index) {
      if (typeof attribute === 'string') {
        attribute = {name: attribute};
      }
      if (! attribute.hasOwnProperty('label')) {
        if ('_activity' === attribute.name) {
          attribute.label = 'Activity';
        } else {
          attribute.label = String.toSentenceCase(attribute.name);
        }
      }
      if (! attribute.hasOwnProperty('visible')) {
        attribute.visible = true;
      }
      attribute.index = index;
      return attribute;
    });
  }

  // set defaults
  _data.defaults.view = args.view || 'table';
  _data.defaults.searchMode = args.searchMode || 'filters';
  _data.defaults.sort = args.sort || 'name:asc';
  _data.defaults.attributes = args.attributes || [];

  _persistentState = JSON.parse(localStorage.getItem('IndexStore__state') || '{}');
  var key = categoryKey(args.category);
  // initialize persistent state if we haven't yet
  if (! _persistentState.hasOwnProperty(key)) {
    _persistentState[key] = {
      view: _data.defaults.view,
      searchMode: _data.defaults.searchMode,
      sort: _data.defaults.sort,
      attributes: _data.defaults.attributes
    }
  }

  // set current state
  var persistent = _persistentState[key];
  _data.view = persistent.view;
  _data.searchMode = persistent.searchMode;
  _data.sort = persistent.sort;
  _data.attributes = persistent.attributes;

  // add any default attributes that weren't persisted
  _data.defaults.attributes.forEach(function (attribute) {
    if (! findAttribute(_data.attributes, attribute.name)) {
      attribute.visible = false;
      _data.attributes.push(attribute);
    };
  });

  _data.includeActivity = false;
  _data.attributes.forEach(function (attribute) {
    // preserve render() function
    _data.defaults.attributes.some(function (defaultAttribute) {
      if (defaultAttribute.name === attribute.name) {
        if (defaultAttribute.hasOwnProperty('render')) {
          attribute.render = defaultAttribute.render;
        }
        if (defaultAttribute.hasLink) {
          attribute.hasLink = defaultAttribute.hasLink;
        }
        return true;
      }
    });
    if (attribute.visible && attribute.name === '_activity') {
      _data.includeActivity = true;
    }
    delete attribute.unfilteredAggregateResult;
  });

  _data.params = {
    category: args.category,
    start: 0,
    count: _data.pageSize,
    search: Search.create(''),
    sort: _data.sort
  };

  clearResults();
}

function findAttribute(attributes, attributeName) {
  return attributes.filter(function (attribute) {
    return attribute.name === attributeName;
  })[0];
}

// attributes we don't allow the user to see when searching
BLACKLIST = {'category': true, 'type': true, 'uri': true, 'eTag': true};

// add additional attributes found in an index result to the list of available attributes
function addAttributesFromResult(obj) {
  _.forOwn(obj, function (value, name) {
    var attribute = findAttribute(_data.attributes, name);
    if (! attribute && ! BLACKLIST[name]) {

      if (typeof obj[name] !== 'object') {
        var attribute = {
          name: name,
          label: String.toSentenceCase(name),
          visible: false
        };
        _data.attributes.push(attribute);
      } else if ('attributes' === name) {
        addAttributesFromResult(value);
      }
    }
  });
}

// context is _data for basic usage and _data.pendingChanges while editing
function sortAttributes(context) {
  // sort, first by show order, then by name
  context.attributes.sort(function (a1, a2) {
    if (a1.visible && a2.visible) {
      return (a1.index < a2.index ? -1 : +1);
    } else if (! a1.visible && ! a2.visible) {
      return AlphaNum.compare(a1.name, a2.name);
    } else {
      return a1.visible ? -1 : +1;
    }
  });
}

// indicate which attribute values are currently being filtered for
function markActiveFilters() {
  _data.attributes.forEach(function (attribute) {
    if (attribute.unfilteredAggregateResult) {
      attribute.unfilteredAggregateResult.counts.forEach(function (value) {
        value.filterActive = _data.params.search.tokens.some(function (token) {
          return token.attribute === attribute.name && token.value === value.value;
        });
      });
    }
  });
}

// construct the appropriate faceted search suggestions based on the last search text term
function buildFacetedSearchSuggestions() {
  _data.facetedSearchSuggestions = [];
  var text = _data.facetedSearchText;

  // match only last term and only if there isn't a trailing space
  var lastChar = text[text.length - 1];
  var matches = text.match(/\S+/g);
  var term = '';
  if (' ' !== lastChar && matches && matches.length > 0) {
    term = matches[matches.length-1].toLowerCase();
  }
  var parts = term.split(':');

  if (parts.length > 1) {

    // attribute:value
    var exp = new RegExp(parts[1] + '[^$]', 'i');
    var attribute = findAttribute(_data.attributes, parts[0]);
    if (attribute.unfilteredAggregateResult) {
      attribute.unfilteredAggregateResult.counts.forEach(function (count) {
        if (exp.test(count.value)) {
          _data.facetedSearchSuggestions.push({term: count.value, count: count.count});
        }
      });
    }

  } else {

    // attribute
    exp = new RegExp(parts[0] + '[^$]', 'i');
    _data.attributes.forEach(function (attribute) {
      if (exp.test(attribute.name) && '_activity' !== attribute.name) {
        _data.facetedSearchSuggestions.push({term: attribute.name + ':'});
      }
    });
  }

  // sort
  _data.facetedSearchSuggestions.sort(function (s1, s2) {
    return AlphaNum.compare(s1.term, s2.term);
  });
}

// set the parameters that will be used for subsequent results
function setParams(params) {
  _data.params = params;
  _data.facetedSearchText = params.search.fullText;
  markActiveFilters();

  // clear out result so we don't use old results after we've asked for new ones
  clearResults();
}

// record a result from the index service
function setResult(result) {
  _data.result = result;

  // save uri -> index to speed up lookups by uri
  _data.uriIndexes = {};
  _data.result.members.forEach(function (member, index) {
    _data.uriIndexes[member.uri] = index;
  });

  // save attributes so we can use them as faceted search suggestions
  if (_data.result.members.length > 1) {
    addAttributesFromResult(_data.result.members[0]);
    sortAttributes(_data);
  }

  buildFacetedSearchSuggestions();
}

// save the activity result for the indicated resource
function setResourceActivityResult(result, uri) {
  if (_data.uriIndexes.hasOwnProperty(uri)) {
    var member = _data.result.members[_data.uriIndexes[uri]];
    member._activity = result;
  }
}

// save the aggregate results
function setAggregateResult(result, context) {
  // ignote results initiated from the Dashboard
  if (context.params.search && context.params.search.tokens &&
    context.params.category === _data.params.category) {
    result.forEach(function (attributeResult) {
      var attribute = findAttribute(_data.attributes, attributeResult.attribute);
      if (attribute) {
        if (context.params.search.fullText.length > 0) {
          attribute.filteredAggregateResult = attributeResult;
        } else {
          attribute.unfilteredAggregateResult = attributeResult;
        }
      }
    });
    markActiveFilters();
    buildFacetedSearchSuggestions();
  }
}

function startChanging() {
  _data.pendingChanges = {
    view: _data.view,
    searchMode: _data.searchMode,
    attributes: _data.attributes.slice(0)
  }
}

function pruneAttributesForPersistence(attributes) {
  return attributes.filter(function (attribute) {
    return attribute.visible || attribute.aggregate || attribute.filter;
  }).map(function (attribute) {
    return {
      name: attribute.name,
      label: attribute.label,
      visible: attribute.visible || false,
      aggregate: attribute.aggregate || false,
      filter: attribute.filter || false
    };
  });
}

function commitChanges() {
  _data.view = _data.pendingChanges.view;
  _data.searchMode = _data.pendingChanges.searchMode;
  _data.attributes = _data.pendingChanges.attributes;

  var key = categoryKey(_data.params.category);
  _persistentState[key].view = _data.view;
  _persistentState[key].searchMode = _data.searchMode;
  _persistentState[key].attributes = pruneAttributesForPersistence(_data.attributes);
  localStorage.setItem('IndexStore__state', JSON.stringify(_persistentState));
}

function abandonChanges() {
  _data.pendingChanges = null;
}

function setView(view) {
  _data.pendingChanges.view = view;
}

function setSearchMode(searchMode) {
  _data.pendingChanges.searchMode = searchMode;
}

function updateAttribute(attributeArg) {
  var attribute = findAttribute(_data.pendingChanges.attributes, attributeArg.name);
  attribute.visible = attributeArg.visible;
  attribute.aggregate = attributeArg.aggregate;
  attribute.filter = attributeArg.filter;
  sortAttributes(_data.pendingChanges);
}

function moveAttribute(fromIndex, toIndex) {
  var attributes = _data.pendingChanges.attributes;
  attributes.splice(toIndex, 0, attributes.splice(fromIndex, 1)[0]);
  _data.pendingChanges.attributes.forEach(function (attribute, index) {
    attribute.index = index;
  });
  sortAttributes(_data.pendingChanges);
}

var IndexStore = _.extend({}, EventEmitter.prototype, {

  // public methods used by Controller-View to operate on data
  getAll: function() {
    return _data;
  },

  nextUri: function (resourceUri) {
    var resultUri = null;
    if (_data.uriIndexes.hasOwnProperty(resourceUri)) {
      var index = _data.uriIndexes[resourceUri] + 1;
      if (index < _data.result.members.length) {
        resultUri = _data.result.members[index].uri;
      }
    }
    return resultUri;
  },

  previousUri: function (resourceUri) {
    var resultUri = null;
    if (_data.uriIndexes.hasOwnProperty(resourceUri)) {
      var index = _data.uriIndexes[resourceUri] - 1;
      if (index >= 0) {
        resultUri = _data.result.members[index].uri;
      }
    }
    return resultUri;
  },

  areSameCategories: function (c1, c2) {
    if (typeof c1 === 'string' && c1 === c2) {
      return true;
    } else if (Array.isArray(c1) && Array.isArray(c2)) {
      if (c1.length !== c2.length) {
        return false;
      }
      for (var i=0; i<c1.length; i++) {
        if (c1[i] !== c2[i]) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  },

  // Allow Controller-View to register itself with store
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  // triggers change listener above, firing controller-view callback
  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {

      case Constants.ActionTypes.INDEX_SET_CONTEXT:
        setContext(action.args);
        IndexStore.emitChange();
        break;

      case Constants.ActionTypes.INDEX_SET_PARAMS:
        setParams(action.params);
        IndexStore.emitChange();
        break;

      case Constants.ActionTypes.INDEX_RESULT:
        setResult(action.response);
        IndexStore.emitChange();
        break;

      case Constants.ActionTypes.INDEX_RESOURCE_ACTIVITY_RESULT:
        setResourceActivityResult(action.response, action.context);
        IndexStore.emitChange();
        break;

      case Constants.ActionTypes.INDEX_AGGREGATE_RESULT:
        setAggregateResult(action.response, action.context);
        IndexStore.emitChange();
        break;

      case Constants.ActionTypes.INDEX_SET_SEARCH_MODE:
        setSearchMode(action.searchMode);
        IndexStore.emitChange();
        break;

      case Constants.ActionTypes.INDEX_START_CHANGING:
        startChanging();
        IndexStore.emitChange();
        break;

      case Constants.ActionTypes.INDEX_COMMIT_CHANGES:
        commitChanges();
        IndexStore.emitChange();
        break;

      case Constants.ActionTypes.INDEX_ABANDON_CHANGES:
        abandonChanges();
        IndexStore.emitChange();
        break;

      case Constants.ActionTypes.INDEX_SET_VIEW:
        setView(action.view);
        IndexStore.emitChange();
        break;

      case Constants.ActionTypes.INDEX_UPDATE_ATTRIBUTE:
        updateAttribute(action.attribute);
        IndexStore.emitChange();
        break;

      case Constants.ActionTypes.INDEX_MOVE_ATTRIBUTE:
        moveAttribute(action.fromIndex, action.toIndex);
        IndexStore.emitChange();
        break;

    }
  })

});

module.exports = IndexStore;
