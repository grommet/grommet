// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Reflux = require('reflux');
var RouteHandler = require('react-router').RouteHandler;
var App = require('grommet/components/App');
var SessionStore = require('grommet/stores/SessionStore');
var Rest = require('grommet/utils/Rest');

var Tour = React.createClass({

  mixins: [Reflux.ListenerMixin],

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _checkSession: function () {
    if (! this.state.session.id && ! this.context.router.isActive('login')) {
      this.context.router.transitionTo('login');
    } else {
      Rest.setHeader('auth', this.state.session.id);
    }
  },

  _onSessionChange: function (session) {
    this.setState({session: session}, this._checkSession);
  },

  getInitialState: function () {
    return {
      session: SessionStore.getInitialState(),
    };
  },

  componentDidMount: function () {
    this.listenTo(SessionStore, this._onSessionChange);
    this._checkSession();
  },

  render: function() {
    return (
      <App centered={false}>
        <RouteHandler />
      </App>
    );
  }

});

module.exports = Tour;
