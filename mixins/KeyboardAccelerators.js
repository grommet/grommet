// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

// Allow callers to use key labels instead of key code numbers.
// This makes their code easier to read.
'use strict';

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

var _keyboardAccelerators = {};
var _listenersCounter = 0;
var _listeners = [];
var _isKeyboardAcceleratorListening = false;

var _onKeyboardAcceleratorKeyPress = function _onKeyboardAcceleratorKeyPress(e) {
  var key = e.keyCode ? e.keyCode : e.which;
  for (var i = _listenersCounter - 1; i >= 0; i--) {
    var id = _listeners[i];
    var handlers = _keyboardAccelerators[id].handlers;
    if (handlers.hasOwnProperty(key)) {
      if (handlers[key](e)) {
        break;
      }
    }
  }
};

// KeyboardAccelerators is a mixin for handling keyboard events.
// Add listeners using startListeningToKeyboard().
// Remove listeners using stopListeningToKeyboard().
// When the component that includes this is unmounted, the keyboard event
// listener is removed automatically.
var KeyboardAccelerators = {
  _initKeyboardAccelerators: function _initKeyboardAccelerators() {
    var id = this.getDOMNode().getAttribute('data-reactid');
    _keyboardAccelerators[id] = {
      handlers: {}
    };
  },

  _getKeyboardAcceleratorHandlers: function _getKeyboardAcceleratorHandlers() {
    var id = this.getDOMNode().getAttribute('data-reactid');
    return _keyboardAccelerators[id].handlers;
  },

  _getDowns: function _getDowns() {
    var id = this.getDOMNode().getAttribute('data-reactid');
    return _keyboardAccelerators[id].downs;
  },

  _isComponentListening: function _isComponentListening() {
    var id = this.getDOMNode().getAttribute('data-reactid');
    for (var i = 0; i < _listenersCounter; i++) {
      if (_listeners[i] === id) {
        return true;
      }
    }
    return false;
  },

  _subscribeComponent: function _subscribeComponent() {
    var id = this.getDOMNode().getAttribute('data-reactid');
    _listeners[_listenersCounter] = id;
    _listenersCounter++;
  },

  _unsubscribeComponent: function _unsubscribeComponent() {
    var id = this.getDOMNode().getAttribute('data-reactid');
    var i = 0;
    for (; i < _listenersCounter; i++) {
      if (_listeners[i] == id) {
        break;
      }
    }
    for (; i < _listenersCounter - 1; i++) {
      _listeners[i] = _listeners[i + 1];
    }
    _listenersCounter--;
    _listeners[_listenersCounter] = null;
    delete _keyboardAccelerators[id];
  },

  // Add handlers for specific keys.
  // This function can be called multiple times, existing handlers will
  // be replaced, new handlers will be added.
  startListeningToKeyboard: function startListeningToKeyboard(handlers) {
    console.warn('grommet/mixins/KeyboardAccelerators is deprecated. Please switch to grommet/utils/KeyboardAccelerators.');
    this._initKeyboardAccelerators();
    var keys = 0;
    for (var key in handlers) {
      if (handlers.hasOwnProperty(key)) {
        var keyCode = key;
        if (KEYS.hasOwnProperty(key)) {
          keyCode = KEYS[key];
        }
        keys += 1;
        this._getKeyboardAcceleratorHandlers()[keyCode] = handlers[key];
      }
    }

    if (keys > 0) {
      if (!_isKeyboardAcceleratorListening) {
        window.addEventListener("keydown", _onKeyboardAcceleratorKeyPress);
        _isKeyboardAcceleratorListening = true;
      }
      if (!this._isComponentListening()) {
        this._subscribeComponent();
      }
    }
  },

  // Remove handlers for all keys or specific keys.
  // If no argument is passed in, all handlers are removed.
  // This function can be called multiple times, only the handlers
  // specified will be removed.
  stopListeningToKeyboard: function stopListeningToKeyboard(handlers) {
    if (!this._isComponentListening()) {
      return;
    }
    if (handlers) {
      for (var key in handlers) {
        if (handlers.hasOwnProperty(key)) {
          var keyCode = key;
          if (KEYS.hasOwnProperty(key)) {
            keyCode = KEYS[key];
          }
          delete this._getKeyboardAcceleratorHandlers()[keyCode];
        }
      }
    }

    var keyCount = 0;
    for (var keyHandler in this._getKeyboardAcceleratorHandlers()) {
      if (this._getKeyboardAcceleratorHandlers().hasOwnProperty(keyHandler)) {
        keyCount += 1;
      }
    }

    if (!handlers || 0 === keyCount) {
      this._initKeyboardAccelerators();
      this._unsubscribeComponent();
    }

    if (_listenersCounter === 0) {
      window.removeEventListener("keydown", _onKeyboardAcceleratorKeyPress);
      _isKeyboardAcceleratorListening = false;
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.stopListeningToKeyboard();
  }
};

module.exports = KeyboardAccelerators;