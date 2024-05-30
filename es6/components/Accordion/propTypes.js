function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    animate: PropTypes.bool,
    children: PropTypes.node,
    level: PropTypes.number,
    onActive: PropTypes.func,
    multiple: PropTypes.bool,
    messages: PropTypes.shape({
      tabContents: PropTypes.string
    })
  });
}
export var AccordionPropTypes = PropType;