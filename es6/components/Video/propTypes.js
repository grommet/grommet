function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    autoPlay: PropTypes.bool,
    controls: PropTypes.oneOfType([PropTypes.oneOf([false, 'over', 'below']), PropTypes.shape({
      position: PropTypes.oneOf([false, 'over', 'below']),
      items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(['captions', 'descriptions', 'fullScreen', 'play', 'pause', 'volume']), PropTypes.shape({
        icon: PropTypes.element,
        a11yTitle: PropTypes.string,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
      })]))
    })]),
    fit: PropTypes.oneOf(['cover', 'contain']),
    loop: PropTypes.bool,
    mute: PropTypes.bool,
    messages: PropTypes.shape({
      closeMenu: PropTypes.string,
      fullScreen: PropTypes.string,
      openMenu: PropTypes.string,
      pauseButton: PropTypes.string,
      playButton: PropTypes.string,
      progressMeter: PropTypes.string,
      scrubber: PropTypes.string,
      volumeDown: PropTypes.string,
      volumeUp: PropTypes.string
    }),
    skipInterval: PropTypes.number
  });
}
export var VideoPropTypes = PropType;