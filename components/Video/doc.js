"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Video) {
  var DocumentedVideo = (0, _reactDesc.describe)(Video).availableAt((0, _utils.getAvailableAtBadge)('Video')).description('A video player.').usage("import { Video } from 'grommet';\n<Video />");
  DocumentedVideo.propTypes = _extends({}, _utils.genericProps, {
    autoPlay: _reactDesc.PropTypes.bool.description('Enables automatic playback of the video as soon as it is loaded.'),
    controls: _reactDesc.PropTypes.oneOf([false, 'over', 'below']).description('Whether to show playback controls and where to place them.').defaultValue('over'),
    fit: _reactDesc.PropTypes.oneOf(['cover', 'contain']).description('How the image fills its container.'),
    loop: _reactDesc.PropTypes.bool.description('Enables continuous video looping.'),
    mute: _reactDesc.PropTypes.bool.description('Enables video muting. This option is best used with the autoPlay flag.')
  });
  return DocumentedVideo;
};

exports.doc = doc;