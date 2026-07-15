function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import PropTypes from 'prop-types';
import { genericProps, heightPropType, padPropType, roundPropType, skeletonColorsPropType, widthPropType } from '../../utils/general-prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
    colors: skeletonColorsPropType,
    height: heightPropType,
    pad: padPropType,
    round: roundPropType,
    width: widthPropType
  });
}
export var SkeletonPropTypes = PropType;