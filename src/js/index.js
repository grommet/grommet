// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var SessionActions = require('./actions/SessionActions');
var NavActions = require('./actions/NavActions');
var Router = require('./utils/Router');

module.exports = {
  // Components
  App: require('./components/App'),
  Donut: require('./components/Donut'),
  FixedHeader: require('./components/FixedHeader'),
  Form: require('./components/Form'),
  Header: require('./components/Header'),
  Link: require('./components/Link'),
  Login: require('./components/Login'),
  Menu: require('./components/Menu'),
  Meter: require('./components/Meter'),
  SearchCombo: require('./components/SearchCombo'),
  Tiles: require('./components/Tiles'),
  Tile: require('./components/Tile'),
  Object: require('./components/Object'),
  TBD: require('./components/TBD'),
  Icons: {
    Changing: require('./components/icons/Changing'),
    Clear: require('./components/icons/Clear'),
    Close: require('./components/icons/Close'),
    DragHandle: require('./components/icons/DragHandle'),
    Edit: require('./components/icons/Edit'),
    Filter: require('./components/icons/Filter'),
    More: require('./components/icons/More'),
    Next: require('./components/icons/Next'),
    Previous: require('./components/icons/Previous'),
    Search: require('./components/icons/Search'),
    SearchPlus: require('./components/icons/SearchPlus'),
    Status: require('./components/icons/Status')
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
    SessionActions.setup();
    NavActions.setup(options);

    Router.init(options.routes);
  },

  start: function () {
    Router.start();
  }
};
