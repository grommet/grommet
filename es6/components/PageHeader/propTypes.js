function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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