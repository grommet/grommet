// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var SessionActions = require('./actions/SessionActions');
var NavActions = require('./actions/NavActions');
var Router = require('./utils/Router');

var Ligo = {
  // Components
  App: require('./components/App'),
  Dialog: require('./components/Dialog'),
  Document: require('./components/Document'),
  Donut: require('./components/Donut'),
  FixedHeader: require('./components/FixedHeader'),
  Footer: require('./components/Footer'),
  Form: require('./components/Form'),
  FormField: require('./components/FormField'),
  Header: require('./components/Header'),
  Label: require('./components/Label'),
  Link: require('./components/Link'),
  Login: require('./components/Login'),
  LoginForm: require('./components/LoginForm'),
  NavUnified: require('./components/NavUnified'),
  Layout: require('./components/Layout'),
  Menu: require('./components/Menu'),
  Meter: require('./components/Meter'),
  Panel: require('./components/Panel'),
  SearchCombo: require('./components/SearchCombo'),
  Tiles: require('./components/Tiles'),
  Tile: require('./components/Tile'),
  Title: require('./components/Title'),
  Object: require('./components/Object'),
  TBD: require('./components/TBD'),
  Icons: {
    Changing: require('./components/icons/Changing'),
    Clear: require('./components/icons/Clear'),
    DragHandle: require('./components/icons/DragHandle'),
    Edit: require('./components/icons/Edit'),
    Filter: require('./components/icons/Filter'),
    Help: require('./components/icons/Help'),
    More: require('./components/icons/More'),
    Next: require('./components/icons/Next'),
    Previous: require('./components/icons/Previous'),
    Search: require('./components/icons/Search'),
    SearchPlus: require('./components/icons/SearchPlus'),
    Status: require('./components/icons/Status'),
  },
  // Mixins
  Mixins: {
    KeyboardAccelerators: require('./mixins/KeyboardAccelerators'),
    ReactLayeredComponent: require('./mixins/ReactLayeredComponent')
  },
  // Constants
  AppConstants: require('./constants/AppConstants'),
  // Dispatchers
  AppDispatcher: require('./dispatchers/AppDispatcher'),
  // Actions
  NavActions: NavActions,
  SessionActions: SessionActions,
  // Stores
  NavStore: require('./stores/NavStore'),
  SessionStore: require('./stores/SessionStore'),
  // Utils
  Api: require('./utils/Api'),
  Router: Router,

  Index: require('./index/index'),

  init: function (options) {
    SessionActions.setup(options.login !== false);
    NavActions.setup(options);

    Router.init(options.routes, options.mainContainerId);
  },

  start: function () {
    Router.start();
  }
};

module.exports = Ligo;
