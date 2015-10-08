// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');
var SessionStore = require('../stores/SessionStore');
//var SessionActions = require('../actions/SessionActions');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var Gravatar = require('react-gravatar');
var IntlMixin = require('../mixins/GrommetIntlMixin');
//var Link = require('../components/Link');

var Session = React.createClass({
  displayName: 'Session',

  mixins: [KeyboardAccelerators, IntlMixin],

  getInitialState: function getInitialState() {
    return SessionStore.getAll();
  },

  componentDidMount: function componentDidMount() {
    SessionStore.addChangeListener(this._onChange);
    this.startListeningToKeyboard({ esc: this._onClose });
  },

  componentWillUnmount: function componentWillUnmount() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function _onChange() {
    this.setState(SessionStore.getAll());
  },

  _onClose: function _onClose() {
    this.props.onRequestClose();
  },

  _onSink: function _onSink(e) {
    e.stopPropagation();
  },

  _onClickLogout: function _onClickLogout() {
    this.stopListeningToKeyboard();
    //SessionActions.logout();
    this.props.onRequestClose();
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'session', onClick: this._onClose },
      React.createElement(
        'div',
        { className: 'session__container', onClick: this._onSink },
        React.createElement(
          'div',
          { className: 'session__control', onClick: this._onClose },
          React.createElement(Gravatar, { email: this.state.email || '', size: 48 })
        ),
        React.createElement(
          'div',
          { className: 'session__state' },
          React.createElement(
            'div',
            { className: 'session__name delta' },
            this.state.name
          ),
          React.createElement(
            'div',
            { className: 'session__duration' },
            'Logged in ',
            this.getGrommetFormattedDate(this.state.created)
          )
        ),
        React.createElement(
          'ul',
          { className: 'session__actions list-bare' },
          React.createElement(
            'li',
            null,
            React.createElement(
              'a',
              { onClick: this._onClickLogout },
              this.getGrommetIntlMessage('Logout')
            )
          )
        )
      )
    );
  }

});

module.exports = Session;