import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    buttonProps: PropTypes.shape({}),
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    disabled: PropTypes.bool,
    dropProps: PropTypes.shape({}),
    icon: PropTypes.node,
    id: PropTypes.string,
    inputProps: PropTypes.shape({}),
    max: PropTypes.string,
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
    min: PropTypes.string,
    minuteStep: PropTypes.number,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    openOnFocus: PropTypes.bool,
    plain: PropTypes.bool,
    readOnly: PropTypes.bool,
    reverse: PropTypes.bool,
    secondStep: PropTypes.number,
    showSeconds: PropTypes.bool,
    step: PropTypes.number,
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
