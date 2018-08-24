import { Children, Component, cloneElement } from 'react';

import doc from './doc';

const KEYS = {
  8: 'onBackspace',
  9: 'onTab',
  13: 'onEnter',
  27: 'onEsc',
  32: 'onSpace',
  37: 'onLeft',
  38: 'onUp',
  39: 'onRight',
  40: 'onDown',
  188: 'onComma',
  16: 'onShift',
};

class Keyboard extends Component {
  componentDidMount() {
    const { target } = this.props;
    if (target === 'document') {
      document.addEventListener('keydown', this.onKeyDown);
    }
  }
  componentWillUnmount() {
    const { target } = this.props;
    if (target === 'document') {
      document.removeEventListener('keydown', this.onKeyDown);
    }
  }
  onKeyDown = (event, ...rest) => {
    const { onKeyDown } = this.props;
    const key = (event.keyCode ? event.keyCode : event.which);
    const callbackName = KEYS[key];
    if (callbackName && this.props[callbackName]) {
      this.props[callbackName](event, ...rest);
    }
    if (onKeyDown) {
      onKeyDown(event, ...rest);
    }
  }
  render() {
    const { children, target } = this.props;

    return target === 'document' ? children : (
      cloneElement(
        Children.only(children), {
          onKeyDown: this.onKeyDown,
        }
      )
    );
  }
}

let KeyboardWrapper = Keyboard;
if (process.env.NODE_ENV !== 'production') {
  KeyboardWrapper = doc(KeyboardWrapper);
}

export default KeyboardWrapper;
