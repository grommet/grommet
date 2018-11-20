import { Children, Component, cloneElement } from 'react';

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
    /* eslint-disable-next-line react/prop-types */
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
    /* eslint-disable-next-line react/prop-types */
    const { onKeyDown } = this.props;
    const key = event.keyCode ? event.keyCode : event.which;
    const callbackName = KEYS[key];
    /* eslint-disable react/destructuring-assignment */
    if (callbackName && this.props[callbackName]) {
      this.props[callbackName](event, ...rest);
    }
    /* eslint-enable react/destructuring-assignment */
    if (onKeyDown) {
      onKeyDown(event, ...rest);
    }
  };

  render() {
    /* eslint-disable-next-line react/prop-types */
    const { children } = this.props;

    return cloneElement(Children.only(children), {
      // always add keydown to make sure document events can stop propagation
      onKeyDown: this.onKeyDown,
    });
  }
}

let KeyboardDoc;
if (process.env.NODE_ENV !== 'production') {
  KeyboardDoc = require('./doc').doc(Keyboard); // eslint-disable-line global-require
}
const KeyboardWrapper = KeyboardDoc || Keyboard;

export { KeyboardWrapper as Keyboard };
