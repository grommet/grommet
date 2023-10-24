function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import PropTypes from 'prop-types';
import { genericSelectProps } from '../Select/propTypes';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericSelectProps, {
    defaultValue: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number])),
    help: PropTypes.node,
    limit: PropTypes.number,
    value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number])),
    showSelectedInline: PropTypes.bool,
    sortSelectedOnClose: PropTypes.bool
  });
}
export var SelectMultiplePropTypes = PropType;