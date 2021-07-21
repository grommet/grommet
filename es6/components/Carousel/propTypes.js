function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
export var CarouselType = _extends({}, genericProps, {
  activeChild: PropTypes.number,
  fill: PropTypes.bool,
  play: PropTypes.number,
  initialChild: PropTypes.number,
  onChild: PropTypes.func,
  controls: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['arrows', 'selectors'])])
});