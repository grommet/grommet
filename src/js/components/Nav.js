// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var AppStore = require('../stores/AppStore');
var NavStore = require('../stores/NavStore');
var NavSearch = require('./NavSearch');
var NavPages = require('./NavPages');
var NavSuggestions = require('./NavSuggestions');
var NavRecents = require('./NavRecents');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var Close = require('./icons/Close');

var Nav = React.createClass({

  mixins: [KeyboardAccelerators],

  _onChange: function() {
    this.setState({nav: NavStore.getAll()});
  },

  _onClose: function(e) {
    this.props.onRequestClose();
  },

  _onSink: function(e) {
    e.stopPropagation();
  },

  getInitialState: function() {
    return {nav: NavStore.getAll(), app: AppStore.getAll()};
  },

  componentDidMount: function() {
    NavStore.addChangeListener(this._onChange);
    this.startListeningToKeyboard({esc: this._onClose});
  },

  componentWillUnmount: function() {
    NavStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var logo = React.createFactory(this.state.app.logo)();
    return (
      <div className={'nav'} onClick={this._onClose}>
        <div className={'nav__container'} onClick={this._onSink}>
          <div className={'nav__header'}>
            <div className={'nav__control'} onClick={this._onClose}>
              {logo}
            </div>
            <NavSearch />
            <div className={"nav__close control-icon"} onClick={this._onClose}>
              <Close />
            </div>
          </div>
          <div className={'nav__sections delta'}>
            <NavPages onRequestClose={this._onClose} />
            <NavSuggestions onRequestClose={this._onClose} />
            <NavRecents onRequestClose={this._onClose} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Nav;
