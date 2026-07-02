import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    buttonProps: PropTypes.shape({}),
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    dropProps: PropTypes.shape({}),
    format: PropTypes.oneOf(['12', '24']),
    focusIndicator: PropTypes.bool,
    icon: PropTypes.element,
    id: PropTypes.string,
    messages: PropTypes.shape({
      activePeriodValue: PropTypes.string,
      activeSection: PropTypes.string,
      activeSectionValue: PropTypes.string,
      chooseTime: PropTypes.string,
      currentValue12: PropTypes.string,
      currentValue24: PropTypes.string,
      enterPicker: PropTypes.string,
      exitPicker: PropTypes.string,
      inputLabel: PropTypes.string,
      invalidTime: PropTypes.string,
      openPicker: PropTypes.string,
    }),
    minuteStep: PropTypes.number,
    name: PropTypes.string,
    onAccept: PropTypes.func,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    onError: PropTypes.func,
    onOpen: PropTypes.func,
    plain: PropTypes.bool,
    readOnly: PropTypes.bool,
    secondStep: PropTypes.number,
    views: PropTypes.arrayOf(
      PropTypes.oneOf(['hours', 'minutes', 'seconds', 'meridiem']),
    ),
    value: PropTypes.string,
  };
}

export const TimeInputPropTypes = PropType;
