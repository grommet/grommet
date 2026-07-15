function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import PropTypes from 'prop-types';
import { colorPropType, genericProps } from '../../utils/general-prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    a11yTitle: PropTypes.string,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.elementType]),
    color: colorPropType,
    disabled: PropTypes.bool,
    gap: PropTypes.oneOfType([PropTypes.oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]),
    href: PropTypes.string,
    icon: PropTypes.element,
    label: PropTypes.node,
    onClick: PropTypes.func,
    reverse: PropTypes.bool,
    size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']), PropTypes.string]),
    weight: PropTypes.oneOfType([PropTypes.oneOf(['normal', 'bold']), PropTypes.string, PropTypes.number])
  });
}
export var AnchorPropTypes = PropType;