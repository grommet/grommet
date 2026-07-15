function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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