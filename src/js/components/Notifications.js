// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
//var NotificationsStore = require('../stores/NotificationsStore');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
//var SVG = require('react-svg');

var Notifications = React.createClass({

  mixins: [KeyboardAccelerators],

  _onChange: function() {
    //this.setState(NotificationsStore.getAll());
  },

  _onClose: function() {
    this.props.onRequestClose();
  },

  _onSink: function(e) {
    e.stopPropagation();
  },

  getInitialState: function() {
    //return NotificationsStore.getAll();
  },

  componentDidMount: function() {
    this.startListeningToKeyboard({esc: this._onClose});
    //NotificationsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.stopListeningToKeyboard();
    //NotificationsStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className={'notifications'} onClick={this._onClose}>
        <div className={'notifications__container'} onClick={this._onSink}>
          <div className={'notifications__control'} onClick={this._onClose}>
          </div>
          <p>TBD</p>
        </div>
      </div>
    );
    //        <SVG className={'notifications__icon control-icon'} path={'img/notifications.svg'}/>
  }

});

module.exports = Notifications;
