function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
export var AccordionType = _extends({}, genericProps, {
  activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  animate: PropTypes.bool,
  children: PropTypes.node,
  onActive: PropTypes.func,
  multiple: PropTypes.bool,
  messages: PropTypes.shape({
    tabContents: PropTypes.string
  })
});