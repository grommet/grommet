// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');

var KEYS = {
  backspace: 8,
  tab: 9,
  enter: 13,
  esc: 27,
  escape: 27,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  comma: 188
};

var KeyboardAccelerators = {

  _keyboardAcceleratorHandlers: {},

  _onKeyboardAcceleratorKeyPress: function (e) {
    var key = (e.keyCode ? e.keyCode : e.which);
    if (this._keyboardAcceleratorHandlers.hasOwnProperty(key)) {
      this._keyboardAcceleratorHandlers[key](e);
    }
  },

  startListeningToKeyboard: function(handlers) {
    for (var key in handlers) {
      if (handlers.hasOwnProperty(key)) {
        var keyCode = key;
        if (KEYS.hasOwnProperty(key)) {
          keyCode = KEYS[key];
        }
       this._keyboardAcceleratorHandlers[keyCode] = handlers[key];
      }
    }
    window.addEventListener("keydown", this._onKeyboardAcceleratorKeyPress);
  },

  stopListeningToKeyboard: function() {
    window.removeEventListener("keydown", this._onKeyboardAcceleratorKeyPress);
  },

  componentWillUnmount: function() {
    window.removeEventListener("keydown", this._onKeyboardAcceleratorKeyPress);
  }
};

module.exports = KeyboardAccelerators;
