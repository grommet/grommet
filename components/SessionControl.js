// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');
var ReactLayeredComponent = require('../mixins/ReactLayeredComponent');
var SessionStore = require('../stores/SessionStore');
var Session = require('../components/Session');
var Gravatar = require('react-gravatar');

var SessionControl = React.createClass({
  displayName: 'SessionControl',

  mixins: [ReactLayeredComponent],

  getInitialState: function getInitialState() {
    return { active: false, session: SessionStore.getAll() };
  },

  componentDidMount: function componentDidMount() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function componentWillUnmount() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function _onChange() {
    this.setState({ session: SessionStore.getAll() });
  },

  _onClick: function _onClick() {
    this.setState({ active: !this.state.active });
  },

  renderLayer: function renderLayer() {
    if (!this.state.active) {
      return React.createElement('span', null);
    } else {
      return React.createElement(Session, { onRequestClose: this._onClick });
    }
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'session-control', onClick: this._onClick },
      React.createElement(Gravatar, { email: this.state.session.email || '', size: 48 })
    );
  }

});

module.exports = SessionControl;