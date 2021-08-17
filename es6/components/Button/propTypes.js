function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import PropTypes from 'prop-types';
import { backgroundPropType, genericProps, colorPropType, hoverIndicatorPropType } from '../../utils/general-prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.node]),
    active: PropTypes.bool,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    badge: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.number, PropTypes.shape({
      background: backgroundPropType,
      max: PropTypes.number,
      value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
    })]),
    color: colorPropType,
    disabled: PropTypes.bool,
    fill: PropTypes.oneOfType([PropTypes.oneOf(['horizontal', 'vertical']), PropTypes.bool]),
    focusIndicator: PropTypes.bool,
    gap: PropTypes.oneOfType([PropTypes.oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]),
    hoverIndicator: hoverIndicatorPropType,
    href: PropTypes.string,
    icon: PropTypes.element,
    label: PropTypes.node,
    onClick: PropTypes.func,
    plain: PropTypes.bool,
    primary: PropTypes.bool,
    reverse: PropTypes.bool,
    secondary: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    target: PropTypes.oneOfType([PropTypes.oneOf(['_self', '_blank', '_parent', '_top']), PropTypes.string]),
    tip: PropTypes.oneOfType([PropTypes.shape({
      content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      dropProps: PropTypes.shape({}),
      plain: PropTypes.bool
    }), PropTypes.string]),
    type: PropTypes.oneOf(['button', 'reset', 'submit'])
  });
}

export var ButtonPropTypes = PropType;