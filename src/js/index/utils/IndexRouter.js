// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var Router = require('../../utils/Router');

var _config;

function configForCategory(category) {
  var result;
  if (Array.isArray(category)) {
    category.some(function (singleCategory) {
      if (_config[singleCategory]) {
        result = _config[singleCategory];
        return true;
      }
    });
  } else {
    result = _config[category];
  }
  return result;
}

module.exports = {

  init: function (config) {
    _config = config;
  },

  resourceHref: function (category, uri, query) {
    var config = configForCategory(category);
    return (config ? Router.makeHref(config.resourceRoute, {splat: uri}, query) : '');
  },

  categoryHref: function (category, query) {
    var config = configForCategory(category);
    return (config ? Router.makeHref(config.route, {}, query) : '');
  },

  categoryRoute: function (category) {
    var config = configForCategory(category);
    return (config ? config.route : '');
  },

  resourceRoute: function (category) {
    var config = configForCategory(category);
    return (config ? config.resourceRoute : '');
  },

  categoryLabel: function (category) {
    var config = configForCategory(category);
    return (config ? config.label : '');
  }
};
