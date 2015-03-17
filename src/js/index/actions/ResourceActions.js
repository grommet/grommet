// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var AppDispatcher = require('../../dispatchers/AppDispatcher');
var Constants = require('../constants/IndexConstants');
var Api = require('../../utils/Api');

module.exports = {

  get: function(uri, category) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.RESOURCE_SETUP,
      category: category,
      uri: uri
    });
    Api.get(Constants.ActionTypes.RESOURCE_RESULT, uri);
  },

  post: function(uri, params) {
    Api.post(Constants.ActionTypes.RESOURCE_ACTION, uri,
      params, params);
  }

};
