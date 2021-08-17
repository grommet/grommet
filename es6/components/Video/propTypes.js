function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    autoPlay: PropTypes.bool,
    controls: PropTypes.oneOf([false, 'over', 'below']),
    fit: PropTypes.oneOf(['cover', 'contain']),
    loop: PropTypes.bool,
    mute: PropTypes.bool,
    messages: PropTypes.shape({
      closeMenu: PropTypes.string,
      fullScreen: PropTypes.string,
      progressMeter: PropTypes.string,
      openMenu: PropTypes.string,
      pauseButton: PropTypes.string,
      playButton: PropTypes.string,
      scrubber: PropTypes.string,
      volumeDown: PropTypes.string,
      volumeUp: PropTypes.string
    })
  });
}

export var VideoPropTypes = PropType;