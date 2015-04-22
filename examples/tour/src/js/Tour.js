// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Menu = require('grommet/components/Menu');
var SessionActions = require('grommet/actions/SessionActions');

var Tour = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _onLogout: function (event) {
    event.preventDefault();
    SessionActions.logout();
    this.context.router.transitionTo('login');
  },

  render: function() {
    return (
      <App>
        <Header primary={true}>
          <Title>
            {"Grommet Tour"}
          </Title>
          <Menu direction="left">
            <a className="button" onClick={this._onLogout}>Logout</a>
          </Menu>
        </Header>
        <RouteHandler />
      </App>
    );
  }

});

module.exports = Tour;
