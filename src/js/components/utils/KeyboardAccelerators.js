// TODO: investigate if we can convert this to a class

import { findDOMNode } from 'react-dom';
import { generateId } from './DOM';

// Allow callers to use key labels instead of key code numbers.
// This makes their code easier to read.
const KEYS = {
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
  shift: 16,
};

const keyboardAccelerators = {};
const listeners = [];
let isKeyboardAcceleratorListening = false;

const onKeyboardAcceleratorKeyPress = (e) => {
  const key = (e.keyCode ? e.keyCode : e.which);
  listeners.slice().reverse().some((listener) => {
    if (keyboardAccelerators[listener]) {
      const handlers = keyboardAccelerators[listener].handlers;
      if (handlers[key]) {
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
export default {
  initKeyboardAccelerators(element) {
    const id = generateId(element);
    keyboardAccelerators[id] = {
      handlers: {},
    };
  },

  getKeyboardAcceleratorHandlers(element) {
    const id = generateId(element);
    return keyboardAccelerators[id].handlers;
  },

  getDowns(element) {
    const id = generateId(element);
    return keyboardAccelerators[id].downs;
  },

  isComponentListening(element) {
    const id = generateId(element);
    return listeners.some(listener => listener === id);
  },

  subscribeComponent(element) {
    const id = generateId(element);
    listeners.push(id);
  },

  unsubscribeComponent(element) {
    const id = generateId(element);

    const removeListenerIndex = listeners.indexOf(id);
    listeners.splice(removeListenerIndex, 1);

    delete keyboardAccelerators[id];
  },

  // Add handlers for specific keys.
  // This function can be called multiple times, existing handlers will
  // be replaced, new handlers will be added.
  startListeningToKeyboard(component, handlers) {
    const element = findDOMNode(component);
    if (element) {
      this.initKeyboardAccelerators(element);
      let keys = 0;
      Object.keys(handlers).forEach((key) => {
        if (handlers[key]) {
          let keyCode = key;
          if (KEYS[key]) {
            keyCode = KEYS[key];
          }
          keys += 1;
          this.getKeyboardAcceleratorHandlers(element)[keyCode] = (
            handlers[key]
          );
        }
      });

      if (keys > 0) {
        if (!isKeyboardAcceleratorListening) {
          window.addEventListener('keydown', onKeyboardAcceleratorKeyPress);
          isKeyboardAcceleratorListening = true;
        }
        if (!this.isComponentListening(element)) {
          this.subscribeComponent(element);
        }
      }
    }
  },

  // Remove handlers for all keys or specific keys.
  // If no argument is passed in, all handlers are removed.
  // This function can be called multiple times, only the handlers
  // specified will be removed.
  stopListeningToKeyboard(component, handlers) {
    const element = findDOMNode(component);
    if (!this.isComponentListening(element)) {
      return;
    }
    if (handlers) {
      Object.keys(handlers).forEach((key) => {
        if (handlers[key]) {
          let keyCode = key;
          if (KEYS[key]) {
            keyCode = KEYS[key];
          }
          delete this.getKeyboardAcceleratorHandlers(element)[keyCode];
        }
      });
    }

    let keyCount = 0;
    Object.keys(this.getKeyboardAcceleratorHandlers(element)).forEach((keyHandler) => {
      if (this.getKeyboardAcceleratorHandlers(element)[keyHandler]) {
        keyCount += 1;
      }
    });

    if (!handlers || keyCount === 0) {
      this.initKeyboardAccelerators(element);
      this.unsubscribeComponent(element);
    }

    if (listeners.length === 0) {
      window.removeEventListener('keydown', onKeyboardAcceleratorKeyPress);
      isKeyboardAcceleratorListening = false;
    }
  },
};
