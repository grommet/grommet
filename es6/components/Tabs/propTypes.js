function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    activeIndex: PropTypes.number,
    alignControls: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
    children: PropTypes.node.isRequired,
    flex: PropTypes.oneOfType([PropTypes.oneOf(['grow', 'shrink']), PropTypes.bool]),
    justify: PropTypes.oneOf(['start', 'center', 'end']),
    messages: PropTypes.shape({
      tabContents: PropTypes.string
    }),
    onActive: PropTypes.func
  });
}
export var TabsPropTypes = PropType;