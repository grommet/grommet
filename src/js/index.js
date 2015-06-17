// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var Grommet = {
  // Components
  App: require('./components/App'),
  Button: require('./components/Button'),
  CheckBox: require('./components/CheckBox'),
  Document: require('./components/Document'),
  Donut: require('./components/Donut'),
  Footer: require('./components/Footer'),
  Form: require('./components/Form'),
  FormField: require('./components/FormField'),
  Header: require('./components/Header'),
  Label: require('./components/Label'),
  Login: require('./components/Login'),
  LoginForm: require('./components/LoginForm'),
  Menu: require('./components/Menu'),
  Meter: require('./components/Meter'),
  Panel: require('./components/Panel'),
  RadioButton: require('./components/RadioButton'),
  Search: require('./components/Search'),
  SearchInput: require('./components/SearchInput'),
  Section: require('./components/Section'),
  Table: require('./components/Table'),
  Tiles: require('./components/Tiles'),
  Tile: require('./components/Tile'),
  Title: require('./components/Title'),
  Object: require('./components/Object'),
  TBD: require('./components/TBD'),
  Icons: {
    Calendar: require('./components/icons/Calendar'),
    Clear: require('./components/icons/Clear'),
    DragHandle: require('./components/icons/DragHandle'),
    Edit: require('./components/icons/Edit'),
    Filter: require('./components/icons/Filter'),
    Help: require('./components/icons/Help'),
    Left: require('./components/icons/Left'),
    More: require('./components/icons/More'),
    Right: require('./components/icons/Right'),
    Search: require('./components/icons/Search'),
    SearchPlus: require('./components/icons/SearchPlus'),
    Spinning: require('./components/icons/Spinning'),
    Status: require('./components/icons/Status')
  },
  // Mixins
  Mixins: {
    KeyboardAccelerators: require('./mixins/KeyboardAccelerators'),
    ReactLayeredComponent: require('./mixins/ReactLayeredComponent')
  },
  // Actions
  Actions: require('./actions/Actions'),
  // Stores
  SessionStore: require('./stores/SessionStore'),
  // Utils
  Rest: require('./utils/Rest'),
  Validator: require('./utils/Validator')
};

module.exports = Grommet;
