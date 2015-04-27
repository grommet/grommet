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
    this.setState({mainMenuActive: true});
  },

  _onCloseMainMenu: function () {
    this.setState({mainMenuActive: false});
  },

  _onLogout: function (event) {
    event.preventDefault();
    SessionActions.logout();
    this.context.router.transitionTo('login');
  },

  _onChange: function () {
    var data = SessionStore.getAll();
    this.setState({data: data});
    if (! data.id && ! this.context.router.isActive('login')) {
      this.context.router.transitionTo('login');
    }
  },

  getInitialState: function () {
    return {
      data: SessionStore.getAll(),
      mainMenuActive: false
    };
  },

  componentDidMount: function () {
    SessionStore.addChangeListener(this._onChange);
    SessionActions.setup();
  },

  componentWillUnmount: function () {
    SessionStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var mainMenu = null;
    if (this.state.mainMenuActive) {
      mainMenu = <TourMainMenu onClose={this._onCloseMainMenu} />;
    }
    return (
      <App centered={false}>
        <Header primary={true}>
          <Title onClick={this._onClickTitle}>
            {"Grommet Tour"}
          </Title>
          <Menu icon={<Gravatar email={this.state.data.email || ''} />}
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
