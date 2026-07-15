function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import PropTypes from 'prop-types';
import { colorPropType, genericProps } from '../../utils/general-prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    color: colorPropType,
    fill: PropTypes.bool,
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6']),
    overflowWrap: PropTypes.oneOfType([PropTypes.oneOf(['normal', 'break-word', 'anywhere']), PropTypes.string]),
    responsive: PropTypes.bool,
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), PropTypes.string]),
    textAlign: PropTypes.oneOf(['start', 'center', 'end', 'justify']),
    truncate: PropTypes.bool,
    weight: PropTypes.oneOfType([PropTypes.oneOf(['normal', 'bold', 'lighter', 'bolder']), PropTypes.number, PropTypes.string])
  });
}
export var HeadingPropTypes = PropType;