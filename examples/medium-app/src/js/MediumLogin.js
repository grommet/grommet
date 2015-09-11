// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Reflux = require('reflux');
var Login = require('grommet/components/Login');
var LoginForm = require('grommet/components/LoginForm');
var Actions = require('grommet/actions/Actions');
var SessionStore = require('grommet/stores/SessionStore');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');
var Logo = require('./MediumLogo');

var MediumLogin = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  mixins: [Reflux.ListenerMixin, IntlMixin],

  getInitialState: function () {
    return {session: SessionStore.getInitialState()};
  },

  componentDidMount: function () {
    this.listenTo(SessionStore, this._onSessionChange);
  },

  _onSubmit: function (fields) {
    Actions.login(fields.username, fields.password);
  },

  _onSessionChange: function (session) {
    if (session.id) {
      setTimeout(function () {
        this.context.router.transitionTo('medium');
      }.bind(this), 1);
    } else {
      this.setState({session: session});
    }
  },

  render: function () {
    var loginError = this.state.session.loginError;
    var errors = [];
    if (loginError) {
      var message;
      var resolution;
      message = this.getGrommetIntlMessage(loginError.message);
      if (loginError.resolution) {
        resolution = this.getGrommetIntlMessage(loginError.resolution);
      }
      errors.push(message);
      errors.push(resolution);
    }
    return (
      <Login background={"img/piano_player.jpg"}>
        <LoginForm
          logo={<Logo />}
          title="Medium App"
          onSubmit={this._onSubmit}
          errors={errors} />
      </Login>
    );
  }

});

module.exports = MediumLogin;
