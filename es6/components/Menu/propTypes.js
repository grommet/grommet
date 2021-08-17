function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
var VERTICAL_ALIGN_OPTIONS = ['top', 'bottom'];
var HORIZONTAL_ALIGN_OPTIONS = ['right', 'left'];
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    disabled: PropTypes.bool,
    dropAlign: PropTypes.shape({
      top: PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
      bottom: PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
      left: PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS),
      right: PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS)
    }),
    dropBackground: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      color: PropTypes.string,
      opacity: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.oneOf(['weak', 'medium', 'strong'])])
    })]),
    dropTarget: PropTypes.object,
    dropProps: PropTypes.object,
    justifyContent: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']),
    icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    messages: PropTypes.shape({
      closeMenu: PropTypes.string,
      openMenu: PropTypes.string
    }),
    open: PropTypes.bool,
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), PropTypes.string])
  });
}

export var MenuPropTypes = PropType;