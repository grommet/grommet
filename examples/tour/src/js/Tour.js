// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Reflux = require('reflux');
var RouteHandler = require('react-router').RouteHandler;
//var Link = require('react-router').Link;
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Menu = require('grommet/components/Menu');
var MainMenu = require('./MainMenu');
var Gravatar = require('react-gravatar');
var Actions = require('grommet/actions/Actions');
var SessionStore = require('grommet/stores/SessionStore');
var Rest = require('grommet/utils/Rest');

var PAGES = [
  {route: 'tour', label: 'Dashboard'},
  {route: 'activity', label: 'Activity'},
  {route: 'enclosures', label: 'Enclosures', indexCategory: 'enclosures'},
  {route: 'tbd', label: 'Reports'},
  {route: 'settings', label: 'Settings'}
];

var Tour = React.createClass({

  mixins: [Reflux.ListenerMixin],

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
    Actions.logout();
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
      mainMenuActive: false
    };
  },

  componentDidMount: function () {
    this.listenTo(SessionStore, this._onSessionChange);
    this._checkSession();
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
        <Header primary={true} fixed={true} flush={false}>
          <Title onClick={this._onClickTitle}>
            {title}
          </Title>
          <Menu icon={<Gravatar email={this.state.session.email || ''} />}
            align="right">
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
