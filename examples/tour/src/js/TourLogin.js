// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Login = require('grommet/components/Login');
var LoginForm = require('grommet/components/LoginForm');
var SessionActions = require('grommet/actions/SessionActions');

var TourLogin = React.createClass({

  _onSubmit: function (fields) {
    console.log('!!! Login _onSubmit TBD', fields);
    SessionActions.login(fields.username, fields.password);
  },

  render: function () {
    return (
      <Login background={"img/piano_player.jpg"}>
        <LoginForm logo={<img src="img/grommet.svg" title="logo" />} title="Grommet Tour" onSubmit={this._onSubmit} />
      </Login>
    );
  }

});

module.exports = TourLogin;
