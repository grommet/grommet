function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import PropTypes from 'prop-types';
import { colorPropType, genericProps } from '../../utils/general-prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    color: colorPropType,
    fill: PropTypes.bool,
    maxLines: PropTypes.number,
    responsive: PropTypes.bool,
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'xxlarge']), PropTypes.string]),
    textAlign: PropTypes.oneOf(['start', 'center', 'end', 'justify'])
  });
}
export var ParagraphPropTypes = PropType;