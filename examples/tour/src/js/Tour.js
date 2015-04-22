// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Menu = require('grommet/components/Menu');
var TourMainMenu = require('./TourMainMenu');
var Gravatar = require('react-gravatar');
var SessionActions = require('grommet/actions/SessionActions');
var SessionStore = require('grommet/stores/SessionStore');

var Tour = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _onClickTitle: function () {
    console.log('!!! Tour _onClickTitle');
    this.setState({mainMenuActive: true});
  },

  _onCloseMainMenu: function () {
    console.log('!!! Tour _onCloseMainMenu');
    this.setState({mainMenuActive: false});
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
    return {
      data: SessionStore.getAll(),
      mainMenuActive: false
    };
  },

  componentDidMount: function () {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    SessionStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var mainMenu = null;
    console.log('!!! Tour render', this.state.mainMenuActive);
    if (this.state.mainMenuActive) {
      mainMenu = <TourMainMenu onClose={this._onCloseMainMenu} />;
    }
    return (
      <App centered={false}>
        <Header primary={true}>
          <div onClick={this._onClickTitle}>
          <Title>
            {"Grommet Tour"}
          </Title>
          </div>
          <Menu icon={<Gravatar email={this.state.data.email || ''} size={48} />}
            align="right">
            <Link to="settings">Settings</Link>
            <a onClick={this._onLogout}>Logout</a>
          </Menu>
        </Header>
        <RouteHandler />
        {mainMenu}
      </App>
    );
  }

});

module.exports = Tour;
