import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    background: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        color: PropTypes.string,
        opacity: PropTypes.oneOfType([
          PropTypes.oneOf(['weak', 'medium', 'strong']),
          PropTypes.number,
          PropTypes.bool,
        ]),
      }),
    ]),
    color: PropTypes.string,
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    round: PropTypes.bool,
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full']),
      PropTypes.string,
    ]),
    thickness: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]),
    type: PropTypes.oneOf(['bar', 'circle', 'pie', 'semicircle']),
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    value: PropTypes.number,
    values: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        highlight: PropTypes.bool,
        label: PropTypes.string.isRequired, // for accessibility
        onClick: PropTypes.func,
        onHover: PropTypes.func,
        value: PropTypes.number.isRequired,
      }),
    ),
  };
}
export const MeterPropTypes = PropType;
