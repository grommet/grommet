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
  render() {
    const { children, onKeyDown } = this.props;

    return (
      cloneElement(
        Children.only(children), {
          onKeyDown: (event, ...rest) => {
            const key = (event.keyCode ? event.keyCode : event.which);
            const callbackName = KEYS[key];
            if (callbackName && this.props[callbackName]) {
              this.props[callbackName](event, ...rest);
            }
            if (onKeyDown) {
              onKeyDown(event, ...rest);
            }
          },
        }
      )
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Keyboard);
}

export default Keyboard;
