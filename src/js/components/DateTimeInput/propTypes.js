import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    dropProps: PropTypes.shape({}),
    format: PropTypes.oneOf(['12', '24']),
    id: PropTypes.string,
    inline: PropTypes.bool,
    messages: PropTypes.shape({
      activeSection: PropTypes.string,
      activeSectionValue: PropTypes.string,
      chooseDateTime: PropTypes.string,
      inputLabel: PropTypes.string,
      invalidDateTime: PropTypes.string,
      openDrop: PropTypes.string,
      sectionDay: PropTypes.string,
      sectionHours: PropTypes.string,
      sectionMeridiem: PropTypes.string,
      sectionMinutes: PropTypes.string,
      sectionMonth: PropTypes.string,
      sectionSeconds: PropTypes.string,
      sectionYear: PropTypes.string,
    }),
    minuteStep: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    value: PropTypes.string,
  };
}

export const DateTimeInputPropTypes = PropType;
