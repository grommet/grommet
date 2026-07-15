function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
import { GridPropTypes } from '../Grid/propTypes';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    actions: PropTypes.element,
    gridProps: GridPropTypes,
    parent: PropTypes.element,
    responsive: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6']),
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  });
}
export var PageHeaderPropTypes = PropType;