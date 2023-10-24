function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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