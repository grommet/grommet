// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var React = require('react');
var Router = require('react-router');
var NavActions = require('../actions/NavActions');

module.exports = {

  init: function (routes, containerId) {
    this._router = Router.create({
      routes: routes
    });

    this._containerId = containerId;
  },

  start: function () {
    this._router.run(function (Handler, state) {
      //console.log('!!! Router router run', state.path);
      this._state = state;
      NavActions.routeChange(state);
      var factory = React.createFactory(Handler);
      var appElement = document.getElementById(this._containerId);
      if (appElement) {
        React.render(factory(), appElement);
      }
    }.bind(this));
  },

  // Wrap react-router.Navigation

  makePath: function (routeName, params, query) {
    return(this._router.makePath(routeName, params, query));
  },

  transitionTo: function (routeName, params, query) {
    this._router.transitionTo(routeName, params, query);
  },

  replaceWith: function (routeName, params, query) {
    this._router.replaceWith(routeName, params, query);
  },

  updateParam: function (name, value) {
    var obj = {};
    obj[name] = value;
    return _.extend({}, this._state.params, obj);
  },

  updateQueryParam: function (name, value) {
    var obj = {};
    obj[name] = value;
    return _.extend({}, this._state.query, obj);
  },

  makeHrefParam: function (name, value) {
    return this._router.makeHref(
      this._state.routes[this._state.routes.length-1].name,
      this.updateQueryParam(name, value),
      this._state.query);
  },

  transitionToParam: function (name, value) {
    this._router.transitionTo(
      this._state.routes[this._state.routes.length-1].name,
      this.updateQueryParam(name, value),
      this._state.query);
  },

  replaceParam: function (name, value) {
    this._router.replaceWith(
      this._state.routes[this._state.routes.length-1].name,
      this.updateQueryParam(name, value),
      this._state.query);
  },

  replaceQueryParam: function (name, value) {
    this._router.replaceWith(
      this._state.routes[this._state.routes.length-1].name,
      this._state.params,
      this.updateQueryParam(name, value));
  },

  makeHref: function (route, params, query) {
    return route; //this._router.makeHref(route, params, query);
  },

  isActive: function (routeName) {
    return this._state.routes.some(function (route) {
      return route.name === routeName;
    });
  },

  param: function (name) {
    return this._state ? this._state.params[name] : null;
  },

  queryParams: function () {
    return this._state.query;
  },

  queryParam: function (name) {
    return this._state ? this._state.query[name] : null;
  }
};
