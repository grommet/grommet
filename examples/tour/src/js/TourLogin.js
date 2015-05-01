// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Reflux = require('reflux');
var Login = require('grommet/components/Login');
var LoginForm = require('grommet/components/LoginForm');
var Actions = require('grommet/actions/Actions');
var SessionStore = require('grommet/stores/SessionStore');

var TourLogin = React.createClass({

  mixins: [Reflux.ListenerMixin],

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _onSubmit: function (fields) {
    Actions.login(fields.username, fields.password);
  },

  _onSessionChange: function (session) {
    if (session.id) {
      setTimeout(function () {
        this.context.router.transitionTo('tour');
      }.bind(this), 1);
    } else {
      this.setState({session: session});
    }
  },

  getInitialState: function () {
    return {session: SessionStore.getInitialState()};
  },

  componentDidMount: function () {
    this.listenTo(SessionStore, this._onSessionChange);
  },

  render: function () {
    var loginError = this.state.session.loginError;
    var errors = [];
    if (loginError) {
      errors.push(loginError.message);
      errors.push(loginError.resolution);
    }
    return (
      <Login background={"img/piano_player.jpg"}>
        <LoginForm
          logo={<img src="img/grommet.svg" title="logo" />}
          title="Grommet Tour"
          onSubmit={this._onSubmit}
          errors={errors} />
      </Login>
    );
  }

});

module.exports = TourLogin;
