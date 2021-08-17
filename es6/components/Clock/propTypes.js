function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    hourLimit: PropTypes.oneOf([12, 24, '12', '24']),
    onChange: PropTypes.func,
    precision: PropTypes.oneOf(['hours', 'minutes', 'seconds']),
    run: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['backward', 'forward'])]),
    size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']), PropTypes.string]),
    time: PropTypes.string,
    type: PropTypes.oneOf(['analog', 'digital'])
  });
}

export var ClockPropTypes = PropType;