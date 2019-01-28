import styled, { css } from 'styled-components';
import { genericStyles, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
var FIT_MAP = {
  cover: 'cover',
  contain: 'contain'
};
var fitStyle = css(["flex:1 1;min-height:0;object-fit:", ";"], function (props) {
  return FIT_MAP[props.fit];
});
var StyledVideo = styled.video.withConfig({
  displayName: "StyledVideo",
  componentId: "w4v8h9-0"
})(["max-width:100%;", "::cue{background:", ";}", ";"], function (props) {
  return props.fit && fitStyle;
}, function (props) {
  return props.theme.video.captions.background;
}, function (props) {
  return props.theme.video && props.theme.video.extend;
});
StyledVideo.defaultProps = {};
Object.setPrototypeOf(StyledVideo.defaultProps, defaultProps);
var StyledVideoContainer = styled.div.withConfig({
  displayName: "StyledVideo__StyledVideoContainer",
  componentId: "w4v8h9-1"
})(["flex:1 1;display:flex;flex-direction:column;overflow:hidden;position:relative;", ";"], genericStyles);
StyledVideoContainer.defaultProps = {};
Object.setPrototypeOf(StyledVideoContainer.defaultProps, defaultProps);
var positionStyle = css(["position:absolute;left:0;right:0;bottom:0;"]);
var StyledVideoControls = styled.div.withConfig({
  displayName: "StyledVideo__StyledVideoControls",
  componentId: "w4v8h9-2"
})(["flex:0 0;", " opacity:0;transition:opacity 0.3s;", ";"], function (props) {
  return props.over && positionStyle;
}, function (props) {
  return props.active ? 'opacity: 1;' : 'pointer-events: none';
});
StyledVideoControls.defaultProps = {};
Object.setPrototypeOf(StyledVideoControls.defaultProps, defaultProps);
var headStyle = css(["::after{content:'';height:100%;width:", ";background:", ";position:absolute;left:", ";}"], function (props) {
  return props.theme.global.edgeSize.xsmall;
}, function (props) {
  return normalizeColor(props.theme.video.scrubber.color, props.theme);
}, function (props) {
  return props.value + "%";
});
var StyledVideoScrubber = styled.div.withConfig({
  displayName: "StyledVideo__StyledVideoScrubber",
  componentId: "w4v8h9-3"
})(["cursor:pointer;width:100%;height:100%;", ";"], function (props) {
  return props.value && headStyle;
});
StyledVideoScrubber.defaultProps = {};
Object.setPrototypeOf(StyledVideoScrubber.defaultProps, defaultProps);
export { StyledVideo, StyledVideoContainer, StyledVideoControls, StyledVideoScrubber };