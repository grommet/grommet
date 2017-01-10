'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactDom = require('react-dom');

var _DOM = require('./DOM');

// Allow callers to use key labels instead of key code numbers.
// This makes their code easier to read.
// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

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
var _listeners = [];
var _isKeyboardAcceleratorListening = false;

var _onKeyboardAcceleratorKeyPress = function _onKeyboardAcceleratorKeyPress(e) {
  var key = e.keyCode ? e.keyCode : e.which;
  _listeners.slice().reverse().some(function (listener) {
    if (_keyboardAccelerators[listener]) {
      var handlers = _keyboardAccelerators[listener].handlers;
      if (handlers.hasOwnProperty(key)) {
        if (handlers[key] && handlers[key](e)) {
          return true;
        }
      }
    }
    return false;
  });
};

// KeyboardAccelerators is a utility for handling keyboard events.
// Add listeners using startListeningToKeyboard().
// Remove listeners using stopListeningToKeyboard().
exports.default = {
  _initKeyboardAccelerators: function _initKeyboardAccelerators(element) {
    var id = (0, _DOM.generateId)(element);
    _keyboardAccelerators[id] = {
      handlers: {}
    };
  },
  _getKeyboardAcceleratorHandlers: function _getKeyboardAcceleratorHandlers(element) {
    var id = (0, _DOM.generateId)(element);
    return _keyboardAccelerators[id].handlers;
  },
  _getDowns: function _getDowns(element) {
    var id = (0, _DOM.generateId)(element);
    return _keyboardAccelerators[id].downs;
  },
  _isComponentListening: function _isComponentListening(element) {
    var id = (0, _DOM.generateId)(element);

    return _listeners.some(function (listener) {
      return listener === id;
    });
  },
  _subscribeComponent: function _subscribeComponent(element) {
    var id = (0, _DOM.generateId)(element);
    _listeners.push(id);
  },
  _unsubscribeComponent: function _unsubscribeComponent(element) {
    var id = (0, _DOM.generateId)(element);

    var removeListenerIndex = _listeners.indexOf(id);
    _listeners.splice(removeListenerIndex, 1);

    delete _keyboardAccelerators[id];
  },


  // Add handlers for specific keys.
  // This function can be called multiple times, existing handlers will
  // be replaced, new handlers will be added.
  startListeningToKeyboard: function startListeningToKeyboard(component, handlers) {
    var element = (0, _reactDom.findDOMNode)(component);
    if (element) {
      this._initKeyboardAccelerators(element);
      var keys = 0;
      for (var key in handlers) {
        if (handlers.hasOwnProperty(key)) {
          var keyCode = key;
          if (KEYS.hasOwnProperty(key)) {
            keyCode = KEYS[key];
          }
          keys += 1;
          this._getKeyboardAcceleratorHandlers(element)[keyCode] = handlers[key];
        }
      }

      if (keys > 0) {
        if (!_isKeyboardAcceleratorListening) {
          window.addEventListener("keydown", _onKeyboardAcceleratorKeyPress);
          _isKeyboardAcceleratorListening = true;
        }
        if (!this._isComponentListening(element)) {
          this._subscribeComponent(element);
        }
      }
    }
  },


  // Remove handlers for all keys or specific keys.
  // If no argument is passed in, all handlers are removed.
  // This function can be called multiple times, only the handlers
  // specified will be removed.
  stopListeningToKeyboard: function stopListeningToKeyboard(component, handlers) {
    var element = (0, _reactDom.findDOMNode)(component);
    if (!this._isComponentListening(element)) {
      return;
    }
    if (handlers) {
      for (var key in handlers) {
        if (handlers.hasOwnProperty(key)) {
          var keyCode = key;
          if (KEYS.hasOwnProperty(key)) {
            keyCode = KEYS[key];
          }
          delete this._getKeyboardAcceleratorHandlers(element)[keyCode];
        }
      }
    }

    var keyCount = 0;
    for (var keyHandler in this._getKeyboardAcceleratorHandlers(element)) {
      if (this._getKeyboardAcceleratorHandlers(element).hasOwnProperty(keyHandler)) {
        keyCount += 1;
      }
    }

    if (!handlers || 0 === keyCount) {
      this._initKeyboardAccelerators(element);
      this._unsubscribeComponent(element);
    }

    if (_listeners.length === 0) {
      window.removeEventListener("keydown", _onKeyboardAcceleratorKeyPress);
      _isKeyboardAcceleratorListening = false;
    }
  }
};
module.exports = exports['default'];