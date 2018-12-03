import styled, { css, keyframes } from 'styled-components';
import { normalizeColor, genericStyles } from '../../utils';
import { defaultProps } from '../../default-props';
var StyledHour = styled.line.withConfig({
  displayName: "StyledClock__StyledHour",
  componentId: "y4xw8s-0"
})(["stroke-width:", ";stroke:", ";transition:stroke 1s ease-out;"], function (props) {
  return props.theme.clock.analog.hour.width;
}, function (props) {
  return normalizeColor(props.theme.clock.analog.hour.color, props.theme);
});
StyledHour.defaultProps = {};
Object.setPrototypeOf(StyledHour.defaultProps, defaultProps);
var StyledMinute = styled.line.withConfig({
  displayName: "StyledClock__StyledMinute",
  componentId: "y4xw8s-1"
})(["stroke-width:", ";stroke:", ";transition:stroke 1s ease-out;"], function (props) {
  return props.theme.clock.analog.minute.width;
}, function (props) {
  return normalizeColor(props.theme.clock.analog.minute.color, props.theme);
});
StyledMinute.defaultProps = {};
Object.setPrototypeOf(StyledMinute.defaultProps, defaultProps);
var StyledSecond = styled.line.withConfig({
  displayName: "StyledClock__StyledSecond",
  componentId: "y4xw8s-2"
})(["stroke-width:", ";stroke:", ";transition:stroke 1s ease-out;"], function (props) {
  return props.theme.clock.analog.second.width;
}, function (props) {
  return normalizeColor(props.theme.clock.analog.second.color, props.theme);
});
StyledSecond.defaultProps = {};
Object.setPrototypeOf(StyledSecond.defaultProps, defaultProps);
var StyledAnalog = styled.svg.withConfig({
  displayName: "StyledClock__StyledAnalog",
  componentId: "y4xw8s-3"
})(["width:", ";height:", ";", " ", ";"], function (props) {
  return props.theme.clock.analog.size[props.size];
}, function (props) {
  return props.theme.clock.analog.size[props.size];
}, genericStyles, function (props) {
  return props.theme.clock.analog && props.theme.clock.analog.extend;
});
StyledAnalog.defaultProps = {};
Object.setPrototypeOf(StyledAnalog.defaultProps, defaultProps);

var sizeStyle = function sizeStyle(props) {
  // size is a combination of the level and size properties
  var size = props.size || 'medium';
  var data = props.theme.clock.digital.text[size];
  return css(["font-size:", ";line-height:", ";"], data.size, data.height);
};

var StyledDigitalDigit = styled.div.withConfig({
  displayName: "StyledClock__StyledDigitalDigit",
  componentId: "y4xw8s-4"
})(["position:relative;width:0.8em;text-align:center;overflow:hidden;", ";"], function (props) {
  return sizeStyle(props);
});
StyledDigitalDigit.defaultProps = {};
Object.setPrototypeOf(StyledDigitalDigit.defaultProps, defaultProps);
var previousUp = keyframes(["0%{transform:translateY(0);}100%{transform:translateY(-100%);}"]);
var previousDown = keyframes(["0%{transform:translateY(0);}100%{transform:translateY(100%);}"]);
var StyledDigitalPrevious = styled.div.withConfig({
  displayName: "StyledClock__StyledDigitalPrevious",
  componentId: "y4xw8s-5"
})(["position:absolute;top:0;left:0;width:0.8em;text-align:center;animation:", " 0.5s forwards;"], function (props) {
  return props.direction === 'down' ? previousDown : previousUp;
});
StyledDigitalPrevious.defaultProps = {};
Object.setPrototypeOf(StyledDigitalPrevious.defaultProps, defaultProps);
var nextUp = keyframes(["0%{transform:translateY(100%);}100%{transform:translateY(0);}"]);
var nextDown = keyframes(["0%{transform:translateY(-100%);}100%{transform:translateY(0);}"]);
var StyledDigitalNext = styled.div.withConfig({
  displayName: "StyledClock__StyledDigitalNext",
  componentId: "y4xw8s-6"
})(["position:absolute;top:0;left:0;width:0.8em;text-align:center;animation:", " 0.5s forwards;"], function (props) {
  return props.direction === 'down' ? nextDown : nextUp;
});
StyledDigitalNext.defaultProps = {};
Object.setPrototypeOf(StyledDigitalNext.defaultProps, defaultProps);
export { StyledHour, StyledMinute, StyledSecond, StyledAnalog, StyledDigitalDigit, StyledDigitalPrevious, StyledDigitalNext };