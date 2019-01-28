"use strict";

exports.__esModule = true;
exports.StyledVideoScrubber = exports.StyledVideoControls = exports.StyledVideoContainer = exports.StyledVideo = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var FIT_MAP = {
  cover: 'cover',
  contain: 'contain'
};
var fitStyle = (0, _styledComponents.css)(["flex:1 1;min-height:0;object-fit:", ";"], function (props) {
  return FIT_MAP[props.fit];
});

var StyledVideo = _styledComponents.default.video.withConfig({
  displayName: "StyledVideo",
  componentId: "w4v8h9-0"
})(["max-width:100%;", "::cue{background:", ";}", ";"], function (props) {
  return props.fit && fitStyle;
}, function (props) {
  return props.theme.video.captions.background;
}, function (props) {
  return props.theme.video && props.theme.video.extend;
});

exports.StyledVideo = StyledVideo;
StyledVideo.defaultProps = {};
Object.setPrototypeOf(StyledVideo.defaultProps, _defaultProps.defaultProps);

var StyledVideoContainer = _styledComponents.default.div.withConfig({
  displayName: "StyledVideo__StyledVideoContainer",
  componentId: "w4v8h9-1"
})(["flex:1 1;display:flex;flex-direction:column;overflow:hidden;position:relative;", ";"], _utils.genericStyles);

exports.StyledVideoContainer = StyledVideoContainer;
StyledVideoContainer.defaultProps = {};
Object.setPrototypeOf(StyledVideoContainer.defaultProps, _defaultProps.defaultProps);
var positionStyle = (0, _styledComponents.css)(["position:absolute;left:0;right:0;bottom:0;"]);

var StyledVideoControls = _styledComponents.default.div.withConfig({
  displayName: "StyledVideo__StyledVideoControls",
  componentId: "w4v8h9-2"
})(["flex:0 0;", " opacity:0;transition:opacity 0.3s;", ";"], function (props) {
  return props.over && positionStyle;
}, function (props) {
  return props.active ? 'opacity: 1;' : 'pointer-events: none';
});

exports.StyledVideoControls = StyledVideoControls;
StyledVideoControls.defaultProps = {};
Object.setPrototypeOf(StyledVideoControls.defaultProps, _defaultProps.defaultProps);
var headStyle = (0, _styledComponents.css)(["::after{content:'';height:100%;width:", ";background:", ";position:absolute;left:", ";}"], function (props) {
  return props.theme.global.edgeSize.xsmall;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.video.scrubber.color, props.theme);
}, function (props) {
  return props.value + "%";
});

var StyledVideoScrubber = _styledComponents.default.div.withConfig({
  displayName: "StyledVideo__StyledVideoScrubber",
  componentId: "w4v8h9-3"
})(["cursor:pointer;width:100%;height:100%;", ";"], function (props) {
  return props.value && headStyle;
});

exports.StyledVideoScrubber = StyledVideoScrubber;
StyledVideoScrubber.defaultProps = {};
Object.setPrototypeOf(StyledVideoScrubber.defaultProps, _defaultProps.defaultProps);