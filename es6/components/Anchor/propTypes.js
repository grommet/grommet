function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import PropTypes from 'prop-types';
import { colorPropType, genericProps } from '../../utils/general-prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    a11yTitle: PropTypes.string,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.elementType]),
    color: colorPropType,
    disabled: PropTypes.bool,
    gap: PropTypes.oneOfType([PropTypes.oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]),
    href: PropTypes.string,
    icon: PropTypes.element,
    label: PropTypes.node,
    onClick: PropTypes.func,
    reverse: PropTypes.bool,
    size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']), PropTypes.string]),
    weight: PropTypes.oneOfType([PropTypes.oneOf(['normal', 'bold']), PropTypes.string, PropTypes.number])
  });
}
export var AnchorPropTypes = PropType;