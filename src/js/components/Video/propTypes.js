import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
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
      volumeUp: PropTypes.string,
    }),
  };
}
export const VideoPropTypes = PropType;
