// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Menu = require('grommet/components/Menu');
var MainMenu = require('./MainMenu');
var Gravatar = require('react-gravatar');
var SessionActions = require('grommet/actions/SessionActions');
var SessionStore = require('grommet/stores/SessionStore');
var Rest = require('grommet/utils/Rest');

var PAGES = [
  {route: 'tour', label: 'Dashboard'},
  {route: 'activity', label: 'Activity'},
  {route: 'tasks', label: 'Tasks', indexCategory: 'tasks'},
  {route: 'tbd', label: 'Reports'},
  {route: 'settings', label: 'Settings'}
];

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
    //this.context.router.transitionTo('login');
  },

  _onSessionChange: function () {
    var data = SessionStore.getAll();
    this.setState({data: data});
    if (! data.id && ! this.context.router.isActive('login')) {
      this.context.router.transitionTo('login');
    } else {
      Rest.setHeader('auth', data.id);
    }
  },

  getInitialState: function () {
    return {
      data: SessionStore.getAll(),
      mainMenuActive: false
    };
  },

  componentDidMount: function () {
    SessionStore.addChangeListener(this._onSessionChange);
    SessionActions.setup();
  },

  componentWillUnmount: function () {
    SessionStore.removeChangeListener(this._onSessionChange);
  },

  render: function() {
    var title = "Grommet Tour";
    PAGES.forEach(function (page) {
      if (this.context.router.isActive(page.route)) {
        title = page.label;
      }
    }, this);

    var mainMenu = null;
    if (this.state.mainMenuActive) {
      mainMenu = <MainMenu pages={PAGES} onClose={this._onCloseMainMenu} />;
    }

    return (
      <App centered={false}>
        <Header primary={true} flush={false}>
          <Title onClick={this._onClickTitle}>
            {title}
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
