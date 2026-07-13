import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    format: PropTypes.oneOf(['12', '24']),
    id: PropTypes.string,
    messages: PropTypes.shape({
      chooseTime: PropTypes.string,
      currentValue12: PropTypes.string,
      currentValue24: PropTypes.string,
      enterDrop: PropTypes.string,
      exitDrop: PropTypes.string,
      inputLabel: PropTypes.string,
      invalidTime: PropTypes.string,
      open: PropTypes.string,
    }),
    minuteStep: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    value: PropTypes.string,
  };
}

export const TimeInputPropTypes = PropType;
