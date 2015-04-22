// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Menu = require('grommet/components/Menu');
var Gravatar = require('react-gravatar');
var SessionActions = require('grommet/actions/SessionActions');
var SessionStore = require('grommet/stores/SessionStore');

var Tour = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _onLogout: function (event) {
    event.preventDefault();
    SessionActions.logout();
    this.context.router.transitionTo('login');
  },

  _onChange: function () {
    this.setState({data: SessionStore.getAll()});
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

  render: function() {
    return (
      <App centered={false}>
        <Header primary={true}>
          <Title>
            {"Grommet Tour"}
          </Title>
          <Menu icon={<Gravatar email={this.data.email} size={48} />}
            align="right">
            <a className="button" onClick={this._onLogout}>Logout</a>
          </Menu>
        </Header>
        <RouteHandler />
      </App>
    );
  }

});

module.exports = Tour;
