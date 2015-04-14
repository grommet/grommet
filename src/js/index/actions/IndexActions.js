// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var AppDispatcher = require('../../dispatchers/AppDispatcher');
var Constants = require('../constants/IndexConstants');
var Api = require('../../utils/Api');

// translate the params used in the UI to the structure used by the REST API
function translateToApiParams (params) {
  var apiParams = _.extend({}, params);
  // split search into query and userQuery
  if (apiParams.search) {

    // split out query terms for api call, attribute:value terms
    apiParams.query = apiParams.search.tokens.filter(function (token) {
        return token.hasOwnProperty('attribute');
      }).map(function (token) {
        return token.attribute + ":'" + token.value + "'";
      }).join(' ');
    if (apiParams.query.length === 0) {
      delete apiParams.query;
    }

    apiParams.userQuery =  apiParams.search.text;
    if (apiParams.userQuery.length === 0) {
      delete apiParams.userQuery;
    }

    delete apiParams.search;
  }

  return apiParams;
}

// We throttle loading resource activity to avoid flooding the network and slowing down the UI.
var pendingTimer = null;
var pendingGets = [];
var pendingActivityUris = {};
var THROTTLE_DELAY = 100; // milliseconds

function getSome () {
  if (pendingGets.length > 0) {
    var getArgs = pendingGets.shift();
    Api.get(getArgs.action, getArgs.restUri, getArgs.apiParams, getArgs.resourceUri);
    clearTimeout(pendingTimer);
    pendingTimer = setTimeout(getSome, THROTTLE_DELAY);
  }
}

function queueActivity (category, uri) {
  if ('tasks' !== category &&
    'alerts' !== category &&
    (! Array.isArray(category) || category.indexOf('alerts') === -1) &&
    ! pendingActivityUris[uri]) {

    var params = {
      category: ['alerts', 'tasks'],
      query: "associatedResourceUri:'" + uri + "' AND " +
        "(state:'Active' OR state:'Running') AND " +
        "parentTaskUri:'null' AND " +
        "NOT taskType:'Background' AND " +
        //"(NOT state:'New' OR NOT state:'Starting') AND " +
        "NOT stateReason:'ValidationError'",
      sort: 'created:desc',
      start: 0,
      count: 5
    };
    var apiParams = translateToApiParams(params);
    var getArgs = {
      action: Constants.ActionTypes.INDEX_RESOURCE_ACTIVITY_RESULT,
      restUri: '/rest/index/resources',
      apiParams: apiParams,
      resourceUri: uri
    };

    pendingGets.push(getArgs);
    pendingActivityUris[uri] = true;
  }
}

var attributeAggregateTimer = null;

function getAttributeAggregates(getter, index) {
  var attributes;

  if (index.params.search.fullText.length > 0) {
    // get aggregated attributes
    attributes = index.attributes.filter(function (attribute) {
      return attribute.aggregate;
    }).map(function (attribute) {
      return attribute.name;
    });

    if (attributes.length > 0) {
      getter(index.params, attributes);
    }

    // if we don't have filter values yet, get them, without any search filter
    attributes = index.attributes.filter(function (attribute) {
      return attribute.filter;
    }).map(function (attribute) {
      return attribute.name;
    });

    if (attributes.length > 0) {
      var filterParams = _.extend({}, index.params,
        {search: {fullText: '', tokens: [], text: ''}});
      getter(filterParams, attributes);
    }
  } else {
    attributes = index.attributes.filter(function (attribute) {
      return attribute.aggregate || attribute.filter;
    }).map(function (attribute) {
      return attribute.name;
    });
    
    if (attributes.length > 0) {
      getter(index.params, attributes);
    }
  }
}

module.exports = {

  setContext: function (args) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.INDEX_SET_CONTEXT,
      args: args
    });
  },

  // index is optional, if provided, aggregates will be loaded as well
  getResult: function (params, index) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.INDEX_SET_PARAMS,
      params: params
    });

    var apiParams = translateToApiParams(params);
    pendingActivityUris = {};
    Api.get(Constants.ActionTypes.INDEX_RESULT,
      '/rest/index/resources', apiParams, {params: params});

    if (index) {
      clearTimeout(attributeAggregateTimer);
      var getter = this.getAggregates;
      attributeAggregateTimer = setTimeout(function () {
        getAttributeAggregates(getter, index);
      }, THROTTLE_DELAY);
    }
  },

  search: function (search, referenceUri, index) {
    var params = _.extend({}, index.params, {search: search, referenceUri: referenceUri});
    this.getResult(params, index);
  },

  loadMore: function (index) {
    var params = _.extend({}, index.params);
    params.count += index.pageSize;
    this.getResult(params);
  },

  getIndexActivity: function (members) {
    for (var i=0; i<members.length; i++) {
      var member = members[i];
      if (! member._activity) {
        queueActivity(member.category, member.uri);
      }
    }
    clearTimeout(pendingTimer);
    pendingTimer = setTimeout(getSome, THROTTLE_DELAY);
  },

  getResourceActivity: function (category, uri) {
    pendingActivityUris = {};
    queueActivity(category, uri);
    clearTimeout(pendingTimer);
    pendingTimer = setTimeout(getSome, THROTTLE_DELAY);
  },

  getAggregates: function (params, attributes, context) {
    var apiParams = translateToApiParams(params);
    apiParams.attribute = attributes;
    Api.get(Constants.ActionTypes.INDEX_AGGREGATE_RESULT,
      '/rest/index/resources/aggregated', apiParams,
      {params: params, attributes: attributes, context: context});
  },

  getResourceMap: function (uri) {
    Api.get(Constants.ActionTypes.INDEX_TREES_AGGREGATED_RESULT,
      '/rest/index/trees/aggregated' + uri, {}, uri);
  },

  startChanging: function () {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.INDEX_START_CHANGING
    });
  },

  commitChanges: function () {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.INDEX_COMMIT_CHANGES
    });
  },

  abandonChanges: function () {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.INDEX_ABANDON_CHANGES
    });
  },

  setView: function (view) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.INDEX_SET_VIEW,
      view: view
    });
  },

  setSearchMode: function (searchMode) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.INDEX_SET_SEARCH_MODE,
      searchMode: searchMode
    });
  },

  updateAttribute: function (attribute) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.INDEX_UPDATE_ATTRIBUTE,
      attribute: attribute
    });
  },

  moveAttribute: function (fromIndex, toIndex) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.INDEX_MOVE_ATTRIBUTE,
      fromIndex: fromIndex,
      toIndex: toIndex
    });
  }

};
