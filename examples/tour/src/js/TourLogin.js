// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Login = require('grommet/components/Login');
var LoginForm = require('grommet/components/LoginForm');
var SessionActions = require('grommet/actions/SessionActions');
var SessionStore = require('grommet/stores/SessionStore');

var TourLogin = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _onSubmit: function (fields) {
    SessionActions.login(fields.username, fields.password);
  },

  _onChange: function () {
    var data = SessionStore.getAll();
    if (data.id) {
      setTimeout(function () {
        this.context.router.transitionTo('tour');
      }.bind(this), 1);
    } else {
      this.setState({data: data});
    }
  },

  getInitialState: function () {
    return {data: SessionStore.getAll()};
  },

  componentDidMount: function () {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    SessionStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var loginError = this.state.data.loginError;
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
