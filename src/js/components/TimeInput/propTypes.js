import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    format: PropTypes.oneOf(['12', '24']),
    id: PropTypes.string,
    messages: PropTypes.shape({
      activePeriodValue: PropTypes.string,
      activeSection: PropTypes.string,
      activeSectionValue: PropTypes.string,
      chooseTime: PropTypes.string,
      currentValue: PropTypes.string,
      inputLabel: PropTypes.string,
      invalidTime: PropTypes.string,
      openDrop: PropTypes.string,
      sectionHours: PropTypes.string,
      sectionMeridiem: PropTypes.string,
      sectionMinutes: PropTypes.string,
      sectionSeconds: PropTypes.string,
    }),
    minuteStep: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    value: PropTypes.string,
  };
}

export const TimeInputPropTypes = PropType;
