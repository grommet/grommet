"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _propTypes = require("../../utils/prop-types");

var _mixins = require("../../utils/mixins");

var _themeDocUtils = require("../../utils/themeDocUtils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Video) {
  var DocumentedVideo = (0, _reactDesc.describe)(Video).availableAt((0, _mixins.getAvailableAtBadge)('Video', 'Media')).description('A video player.').usage("import { Video } from 'grommet';\n<Video />").intrinsicElement('video');
  DocumentedVideo.propTypes = _extends({}, _propTypes.genericProps, {
    autoPlay: _reactDesc.PropTypes.bool.description('Enables automatic playback of the video as soon as it is loaded.'),
    controls: _reactDesc.PropTypes.oneOf([false, 'over', 'below']).description('Whether to show playback controls and where to place them.').defaultValue('over'),
    fit: _reactDesc.PropTypes.oneOf(['cover', 'contain']).description('How the image fills its container.'),
    loop: _reactDesc.PropTypes.bool.description('Enables continuous video looping.'),
    mute: _reactDesc.PropTypes.bool.description('Enables video muting. This option is best used with the autoPlay flag.'),
    messages: _reactDesc.PropTypes.shape({
      closeMenu: _reactDesc.PropTypes.string,
      fullScreen: _reactDesc.PropTypes.string,
      progressMeter: _reactDesc.PropTypes.string,
      openMenu: _reactDesc.PropTypes.string,
      pauseButton: _reactDesc.PropTypes.string,
      playButton: _reactDesc.PropTypes.string,
      scrubber: _reactDesc.PropTypes.string,
      volumeDown: _reactDesc.PropTypes.string,
      volumeUp: _reactDesc.PropTypes.string
    }).description("Custom messages. Used for accessibility by screen readers.")
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
  'video.icons.closedCaption': {
    description: 'The icon to use for the caption.',
    type: 'React.Element',
    defaultValue: '<ClosedCaption />'
  },
  'video.icons.configure': {
    description: 'The icon to use for the configuration action.',
    type: 'React.Element',
    defaultValue: '<Actions />'
  },
  'video.icons.fullScreen': {
    description: 'The icon to use for viewing the video in full screen.',
    type: 'React.Element',
    defaultValue: '<Expand />'
  },
  'video.icons.pause': {
    description: 'The icon to use for pausing the video.',
    type: 'React.Element',
    defaultValue: '<Pause />'
  },
  'video.icons.play': {
    description: 'The icon to use for playing the video.',
    type: 'React.Element',
    defaultValue: '<Play />'
  },
  'video.icons.reduceVolume': {
    description: 'The icon to use for the action of lowering the volume.',
    type: 'React.Element',
    defaultValue: '<VolumeLow />'
  },
  'video.icons.volume': {
    description: 'The icon to use for the action of raising the volume.',
    type: 'React.Element',
    defaultValue: '<Volume />'
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