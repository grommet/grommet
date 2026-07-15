function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    anchor: PropTypes.oneOf(['center', 'left', 'right', 'top', 'bottom', 'top-left', 'bottom-left', 'top-right', 'bottom-right']),
    fill: PropTypes.oneOfType([PropTypes.oneOf(['horizontal', 'vertical']), PropTypes.bool]),
    guidingChild: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['first', 'last'])]),
    interactiveChild: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['first', 'last'])])
  });
}
export var StackPropTypes = PropType;