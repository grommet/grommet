function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import PropTypes from 'prop-types';
import { colorPropType, genericProps, MARGIN_SIZES, skeletonPropType } from '../../utils/general-prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    color: colorPropType,
    margin: PropTypes.oneOfType([PropTypes.oneOf(['none'].concat(MARGIN_SIZES)), PropTypes.shape({
      bottom: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
      end: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
      horizontal: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
      left: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
      right: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
      start: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
      top: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
      vertical: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string])
    }), PropTypes.string]),
    size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', '2xl', '3xl', '4xl', '5xl', '6xl']), PropTypes.string]),
    skeleton: skeletonPropType,
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
    textAlign: PropTypes.oneOf(['start', 'center', 'end', 'justify']),
    tip: PropTypes.oneOfType([PropTypes.shape({
      content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      dropProps: PropTypes.shape({}),
      plain: PropTypes.bool
    }), PropTypes.string]),
    truncate: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['tip'])]),
    weight: PropTypes.oneOfType([PropTypes.oneOf(['normal', 'bold', 'bolder', 'lighter']), PropTypes.number]),
    wordBreak: PropTypes.oneOf(['normal', 'break-all', 'keep-all', 'break-word'])
  });
}
export var TextPropTypes = PropType;