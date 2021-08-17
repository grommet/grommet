import PropTypes from 'prop-types';
import { colorPropType } from '../../utils/general-prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    color: colorPropType,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    invert: PropTypes.bool,
    max: PropTypes.number,
    messages: PropTypes.shape({
      lower: PropTypes.string,
      upper: PropTypes.string
    }),
    min: PropTypes.number,
    onChange: PropTypes.func,
    opacity: PropTypes.oneOfType([PropTypes.oneOf(['weak', 'medium', 'strong']), PropTypes.string, PropTypes.bool]),
    round: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'full']), PropTypes.string]),
    size: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), PropTypes.string]),
    step: PropTypes.number,
    values: PropTypes.arrayOf(PropTypes.number).isRequired
  };
}

export var RangeSelectorPropTypes = PropType;