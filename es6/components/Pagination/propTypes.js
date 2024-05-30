function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    numberEdgePages: PropTypes.number,
    numberItems: PropTypes.number,
    numberMiddlePages: PropTypes.number,
    onChange: PropTypes.func,
    page: PropTypes.number,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    step: PropTypes.number,
    stepOptions: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.element, PropTypes.object]))]),
    summary: PropTypes.bool
  });
}
export var PaginationPropTypes = PropType;