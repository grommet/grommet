import styled, { css } from 'styled-components';
import { genericStyles, normalizeColor } from '../../utils';
var FIT_MAP = {
  cover: 'cover',
  contain: 'contain'
};
var fitStyle = css(["flex:1 1;min-height:0;object-fit:", ";"], function (props) {
  return FIT_MAP[props.fit];
});
export var StyledVideo = styled.video.withConfig({
  displayName: "StyledVideo",
  componentId: "w4v8h9-0"
})(["max-width:100%;", "::cue{background:", ";}", ";"], function (props) {
  return props.fit && fitStyle;
}, function (props) {
  return props.theme.video.captions.background;
}, function (props) {
  return props.theme.video && props.theme.video.extend;
});
export var StyledVideoContainer = styled.div.withConfig({
  displayName: "StyledVideo__StyledVideoContainer",
  componentId: "w4v8h9-1"
})(["flex:1 1;display:flex;flex-direction:column;overflow:hidden;position:relative;", ";"], genericStyles);
var positionStyle = css(["position:absolute;left:0;right:0;bottom:0;"]);
export var StyledVideoControls = styled.div.withConfig({
  displayName: "StyledVideo__StyledVideoControls",
  componentId: "w4v8h9-2"
})(["flex:0 0;", " opacity:0;transition:opacity 0.3s;", ";"], function (props) {
  return props.over && positionStyle;
}, function (props) {
  return props.active ? 'opacity: 1;' : 'pointer-events: none';
});
var headStyle = css(["::after{content:'';height:100%;width:", ";background:", ";position:absolute;left:", ";}"], function (props) {
  return props.theme.global.edgeSize.xsmall;
}, function (props) {
  return normalizeColor('light-5', props.theme);
}, function (props) {
  return props.value + "%";
});
export var StyledVideoScrubber = styled.div.withConfig({
  displayName: "StyledVideo__StyledVideoScrubber",
  componentId: "w4v8h9-3"
})(["cursor:pointer;", ";"], function (props) {
  return props.value && headStyle;
});