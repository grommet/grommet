import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    hourLimit: PropTypes.oneOf([12, 24, '12', '24']),
    onChange: PropTypes.func,
    precision: PropTypes.oneOf(['hours', 'minutes', 'seconds']),
    run: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['backward', 'forward']),
    ]),
    size: PropTypes.oneOfType([
      PropTypes.oneOf([
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
      ]),
      PropTypes.string,
    ]),
    time: PropTypes.string,
    type: PropTypes.oneOf(['analog', 'digital']),
  };
}
export const ClockPropTypes = PropType;
