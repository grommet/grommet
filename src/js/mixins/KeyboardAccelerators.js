// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

// Allow callers to use key labels instead of key code numbers.
// This makes their code easier to read.
var KEYS = {
  backspace: 8,
  tab: 9,
  enter: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  comma: 188,
  shift: 16
};

var downs = [];

// KeyboardAccelerators is a mixin for handling keyboard events.
// Add listeners using startListeningToKeyboard().
// Remove listeners using stopListeningToKeyboard().
// When the component that includes this is unmounted, the keyboard event
// listener is removed automatically.
var KeyboardAccelerators = {

  _keyboardAcceleratorHandlers: {},
  _keyboardAcceleratorListening: false,

  _onKeyboardAcceleratorKeyPress: function (e) {
    var key = (e.keyCode ? e.keyCode : e.which);
    if (this._keyboardAcceleratorHandlers.hasOwnProperty(key)) {
      this._keyboardAcceleratorHandlers[key](e);
    }
    downs[e.keyCode] = true;
  },

  _onKeyboardAcceleratorKeyUp: function (e) {
    if (downs[KEYS.shift] && downs[KEYS.left]) {
      this._keyboardAcceleratorHandlers.shiftLeft(e);
    } else if (downs[KEYS.shift] && downs[KEYS.right]) {
      this._keyboardAcceleratorHandlers.shiftRight(e);
    }

    downs[e.keyCode] = false;
  },

  // Add handlers for specific keys.
  // This function can be called multiple times, existing handlers will
  // be replaced, new handlers will be added.
  startListeningToKeyboard: function (handlers) {
    var keys = 0;
    for (var key in handlers) {
      if (handlers.hasOwnProperty(key)) {
        var keyCode = key;
        if (KEYS.hasOwnProperty(key)) {
          keyCode = KEYS[key];
        }
        keys += 1;
        this._keyboardAcceleratorHandlers[keyCode] = handlers[key];
      }
    }

    if (keys > 0 && ! this._keyboardAcceleratorListening) {
      window.addEventListener("keydown", this._onKeyboardAcceleratorKeyPress);
      window.addEventListener("keyup", this._onKeyboardAcceleratorKeyUp);
      this._keyboardAcceleratorListening = true;
    }
  },

  // Remove handlers for all keys or specific keys.
  // If no argument is passed in, all handlers are removed.
  // This function can be called multiple times, only the handlers
  // specified will be removed.
  stopListeningToKeyboard: function (handlers) {
    if (handlers) {
      for (var key in handlers) {
        if (handlers.hasOwnProperty(key)) {
          var keyCode = key;
          if (KEYS.hasOwnProperty(key)) {
            keyCode = KEYS[key];
          }
          delete this._keyboardAcceleratorHandlers[keyCode];
        }
      }
    }

    var keyCount = 0;
    for (var keyHandler in this._keyboardAcceleratorHandlers) {
      if (this._keyboardAcceleratorHandlers.hasOwnProperty(keyHandler)) {
        keyCount += 1;
      }
    }

    if (! handlers || 0 === keyCount) {
      window.removeEventListener("keydown", this._onKeyboardAcceleratorKeyPress);
      window.removeEventListener("keyup", this._onKeyboardAcceleratorKeyUp);
      this._keyboardAcceleratorHandlers = {};
      this._keyboardAcceleratorListening = false;
    }
  },

  componentWillUnmount: function () {
    this.stopListeningToKeyboard();
  }
};

module.exports = KeyboardAccelerators;
