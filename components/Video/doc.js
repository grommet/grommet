"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var _themeDocUtils = require("../../utils/themeDocUtils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Video) {
  var DocumentedVideo = (0, _reactDesc.describe)(Video).availableAt((0, _utils.getAvailableAtBadge)('Video')).description('A video player.').usage("import { Video } from 'grommet';\n<Video />").intrinsicElement('video');
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

var themeDoc = _extends({}, _themeDocUtils.themeDocUtils.responsiveBreakpoint('The actual breakpoint to trigger changes in the video component layout.'), {
  'global.edgeSize.xsmall': {
    description: 'The width of the video scrubber.',
    type: 'object',
    defaultValue: '6px'
  },
  'video.captions.background': {
    description: 'The caption background color of the video ',
    type: 'string',
    defaultValue: 'rgba(0, 0, 0, 0.7)'
  },
  'video.scrubber.color': {
    description: 'The background color of the video scrubber.',
    type: 'string',
    defaultValue: 'light-4'
  },
  'video.extend': {
    description: 'Any additional style for Video.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
});

exports.themeDoc = themeDoc;