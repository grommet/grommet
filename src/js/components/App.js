// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Navigation = require('react-router').Navigation;
var RouterState = require('react-router').State;
var Router = require('../utils/Router');
var SessionStore = require('../stores/SessionStore');
var Header = require('./Header');
var App = React.createClass({

  mixins: [Navigation, RouterState],

  statics: {
    authRedirectTarget: function (path, postLoginPath) {
      var data = SessionStore.getAll();
      var result = null;
      if (! data.id) {
        if (! path.match(/login/)) {
          result = 'login';
        }
      } else if (data.id) {
        if (path.match(/login/)) {
          result = postLoginPath || 'app';
        }
      }
      return result;
    },

    willTransitionTo: function (transition, params, query) {
      var path = transition.path;
      var target = this.authRedirectTarget(path, query.postLoginPath);
      if ('login' === target) {
        transition.redirect('login', {}, { 'postLogin' : path });
      } else if (target) {
        transition.redirect(target);
      }
    }
  },

  _onChange: function() {
    var data = SessionStore.getAll();
    this.setState(data);
    var target = App.authRedirectTarget(this.getPathname(), this.getQuery().postLogin);
    if (target) {
      // avoid nested dispatches
      setTimeout(function () {
        this.transitionTo(target);
      }.bind(this), 1);
    }
  },

  getInitialState: function() {
    return SessionStore.getAll();
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
    var loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.parentNode.removeChild(loadingElement);
    }
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var classes = ['app'];
    var active = false;
    if (this.state.id) {
      classes.push('app--active');
      active = true;
    }
    return (
      <div className={classes.join(' ')}>
        <Header active={active} />
        <div className={"app__content"}>
          <RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports = App;
