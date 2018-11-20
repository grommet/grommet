function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, getAvailableAtBadge } from '../../utils';
export var doc = function doc(Video) {
  var DocumentedVideo = describe(Video).availableAt(getAvailableAtBadge('Video')).description('A video player.').usage("import { Video } from 'grommet';\n<Video />");
  DocumentedVideo.propTypes = _extends({}, genericProps, {
    autoPlay: PropTypes.bool.description('Enables automatic playback of the video as soon as it is loaded.'),
    controls: PropTypes.oneOf([false, 'over', 'below']).description('Whether to show playback controls and where to place them.').defaultValue('over'),
    fit: PropTypes.oneOf(['cover', 'contain']).description('How the image fills its container.'),
    loop: PropTypes.bool.description('Enables continuous video looping.'),
    mute: PropTypes.bool.description('Enables video muting. This option is best used with the autoPlay flag.')
  });
  return DocumentedVideo;
};