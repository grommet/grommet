// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var React = require('react');
var SessionStore = require('../stores/SessionStore');
var SessionActions = require('../actions/SessionActions');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var Gravatar = require('react-gravatar');
var Timestamp = require('react-time');
var Link = require('../components/Link');

var Session = React.createClass({

  mixins: [KeyboardAccelerators],

  _onChange: function() {
    this.setState(SessionStore.getAll());
  },

  _onClose: function(e) {
    this.props.onRequestClose();
  },

  _onSink: function(e) {
    e.stopPropagation();
  },

  _onClickLogout: function(e) {
    this.stopListeningToKeyboard();
    SessionActions.logout();
    this.props.onRequestClose();
  },

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
              <Timestamp value={this.state.created} relative />
            </div>
          </div>
          <ul className={'session__actions list-bare'}>
            <li><Link href="">Edit account</Link></li>
            <li><Link href="">About</Link></li>
            <li><a onClick={this._onClickLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = Session;
