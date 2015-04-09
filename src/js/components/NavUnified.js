// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
/*
var AppStore = require('../stores/AppStore');
var NavStore = require('../stores/NavStore');
*/
var NavSearch = require('./NavSearch');
var NavPages = require('./NavPages');
var NavSuggestions = require('./NavSuggestions');
var NavRecents = require('./NavRecents');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var Close = require('./icons/Close');

var NavUnified = React.createClass({

  /*
  mixins: [KeyboardAccelerators],

  _onChange: function() {
    this.setState({nav: NavStore.getAll()});
  },
  */

  _onClose: function() {
    this.props.onRequestClose();
  },

  _onSink: function(e) {
    e.stopPropagation();
  },

  /*
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
  */

  render: function() {

    //var logo = React.createFactory(this.state.app.logo)();
    return (
      <div className={'nav-unified'} onClick={this._onClose}>
        <div className={'nav-unified__container'} onClick={this._onSink}>
          <div className={'nav-unified__header'}>
            <div className={'nav-unified__control'} onClick={this._onClose} />
            <NavSearch />
            <div className={"nav-unified__close control-icon"} onClick={this._onClose}>
              <Close />
            </div>
          </div>
          <div className={'nav-unified__sections delta'}>
            {this.props.menu}
            <NavPages onRequestClose={this._onClose} />
            <NavSuggestions onRequestClose={this._onClose} />
            <NavRecents onRequestClose={this._onClose} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = NavUnified;
