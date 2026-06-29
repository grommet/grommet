import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    bounds: PropTypes.arrayOf(PropTypes.string),
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    disabled: PropTypes.bool,
    messages: PropTypes.shape({
      closeTimePicker: PropTypes.string,
      hoursLabel: PropTypes.string,
      invalidTime: PropTypes.string,
      minutesLabel: PropTypes.string,
      openTimePicker: PropTypes.string,
      outOfBounds: PropTypes.string,
      periodLabel: PropTypes.string,
      secondsLabel: PropTypes.string,
    }),
    minuteStep: PropTypes.number,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    plain: PropTypes.bool,
    readOnly: PropTypes.bool,
    secondStep: PropTypes.number,
    showSeconds: PropTypes.bool,
    timeFormat: PropTypes.oneOf(['12hr', '24hr']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    size: PropTypes.oneOfType([
      PropTypes.oneOf([
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
      ]),
      PropTypes.string,
    ]),
  };
}

export const TimeInputPropTypes = PropType;
