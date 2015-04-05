// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Navigation = require('react-router').Navigation;
var RouterState = require('react-router').State;
var SessionStore = require('../stores/SessionStore');
var Header = require('./Header');
var App = React.createClass({

  mixins: [Navigation, RouterState],

  statics: {

    willTransitionTo: function (transition, params, query) {
      var data = SessionStore.getAll();

      if (SessionStore.loginEnabled()) {
        var path = transition.path;
        if (!data.id && !path.match(/login/)) {
          transition.redirect('login', {}, { 'postLogin': path });
        } else if (data.id && path.match(/login/)) {
          transition.redirect(query.postLoginPath || 'app');
        }
      }
      
    }
  },

  _onChange: function() {
    var data = SessionStore.getAll();
    this.setState(data);
    var target = 'login';
    if (data.id) {
     target = this.getQuery().postLogin || 'app';
    }

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
    if (SessionStore.loginEnabled()) {
      SessionStore.addChangeListener(this._onChange);  
    }
    
    var loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.parentNode.removeChild(loadingElement);
    }
  },

  componentWillUnmount: function() {
    if (SessionStore.loginEnabled()) {
      SessionStore.removeChangeListener(this._onChange);
    }  
  },

  render: function() {
    var classes = ['app'];
    var active = false;

    var loginEnabled = SessionStore.loginEnabled();

    if (this.state.id || !loginEnabled) {
      classes.push('app--active');
      active = true;
    }
    return (
      <div className={classes.join(' ')}>
        <Header active={active} showSessionControl={loginEnabled}/>
        <div className={"app__content"}>
          <RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports = App;
