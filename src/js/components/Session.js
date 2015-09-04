// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var SessionStore = require('../stores/SessionStore');
//var SessionActions = require('../actions/SessionActions');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var Gravatar = require('react-gravatar');
var IntlMixin = require('../mixins/GrommetIntlMixin');
//var Link = require('../components/Link');

var Session = React.createClass({

  mixins: [KeyboardAccelerators, IntlMixin],

  getInitialState: function() {
    return SessionStore.getAll();
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
    this.startListeningToKeyboard({esc: this._onClose});
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(SessionStore.getAll());
  },

  _onClose: function() {
    this.props.onRequestClose();
  },

  _onSink: function(e) {
    e.stopPropagation();
  },

  _onClickLogout: function() {
    this.stopListeningToKeyboard();
    //SessionActions.logout();
    this.props.onRequestClose();
  },

  render: function() {
    return (
      <div className={'session'} onClick={this._onClose}>
        <div className={'session__container'} onClick={this._onSink}>
          <div className={'session__control'} onClick={this._onClose}>
            <Gravatar email={this.state.email || ''} size={48} />
          </div>
          <div className={'session__state'}>
            <div className={'session__name delta'}>{this.state.name}</div>
            <div className={'session__duration'}>
              {'Logged in '}
              {this.getGrommetFormattedDate(this.state.created)}
            </div>
          </div>
          <ul className={'session__actions list-bare'}>
            <li><a onClick={this._onClickLogout}>{this.getGrommetIntlMessage('Logout')}</a></li>
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = Session;
