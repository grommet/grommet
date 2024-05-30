function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    as: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])),
    children: PropTypes.func,
    onMore: PropTypes.func,
    paginate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    show: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
      page: PropTypes.number
    })]),
    step: PropTypes.number
  });
}
export var CardsPropTypes = PropType;