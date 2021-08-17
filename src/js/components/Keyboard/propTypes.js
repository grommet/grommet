import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    target: PropTypes.oneOf(['component', 'document']),
    onBackspace: PropTypes.func,
    onComma: PropTypes.func,
    onDown: PropTypes.func,
    onEnter: PropTypes.func,
    onEsc: PropTypes.func,
    onKeyDown: PropTypes.func,
    onLeft: PropTypes.func,
    onRight: PropTypes.func,
    onShift: PropTypes.func,
    onSpace: PropTypes.func,
    onTab: PropTypes.func,
    onUp: PropTypes.func,
  };
}
export const KeyboardPropTypes = PropType;
