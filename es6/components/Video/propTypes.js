function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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