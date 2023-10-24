function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import PropTypes from 'prop-types';
import { colorPropType, genericProps } from '../../utils/general-prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    color: colorPropType,
    fill: PropTypes.bool,
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6']),
    overflowWrap: PropTypes.oneOfType([PropTypes.oneOf(['normal', 'break-word', 'anywhere']), PropTypes.string]),
    responsive: PropTypes.bool,
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), PropTypes.string]),
    textAlign: PropTypes.oneOf(['start', 'center', 'end', 'justify']),
    truncate: PropTypes.bool,
    weight: PropTypes.oneOfType([PropTypes.oneOf(['normal', 'bold', 'lighter', 'bolder']), PropTypes.number, PropTypes.string])
  });
}
export var HeadingPropTypes = PropType;