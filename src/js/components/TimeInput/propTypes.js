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
      currentValue: PropTypes.string,
      enterDrop: PropTypes.string,
      exitDrop: PropTypes.string,
      inputLabel: PropTypes.string,
      invalidTime: PropTypes.string,
      openDrop: PropTypes.string,
    }),
    minuteStep: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    value: PropTypes.string,
  };
}

export const TimeInputPropTypes = PropType;
