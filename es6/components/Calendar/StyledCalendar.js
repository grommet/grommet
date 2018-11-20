import styled, { css, keyframes } from 'styled-components';
import { backgroundStyle, genericStyles, parseMetricToNum } from '../../utils';

var sizeStyle = function sizeStyle(props) {
  var data = props.theme.calendar[props.sizeProp];
  return css(["font-size:", ";line-height:", ";width:", ";"], data.fontSize, data.lineHeight, props.theme.global.size[props.sizeProp]);
};

export var StyledCalendar = styled.div.withConfig({
  displayName: "StyledCalendar",
  componentId: "sc-1y4xhmp-0"
})(["", " ", " ", ""], genericStyles, function (props) {
  return sizeStyle(props);
}, function (props) {
  return props.theme.calendar && props.theme.calendar.extend;
});
export var StyledWeeksContainer = styled.div.withConfig({
  displayName: "StyledCalendar__StyledWeeksContainer",
  componentId: "sc-1y4xhmp-1"
})(["overflow:hidden;", ";"], function (props) {
  return "height: " + parseMetricToNum(props.theme.calendar[props.sizeProp].daySize) * 6 + "px;";
});

var slideStyle = function slideStyle(props) {
  var _props$slide = props.slide,
      direction = _props$slide.direction,
      weeks = _props$slide.weeks,
      sizeProp = props.sizeProp,
      theme = props.theme;
  var _theme$calendar$sizeP = theme.calendar[sizeProp],
      daySize = _theme$calendar$sizeP.daySize,
      slideDuration = _theme$calendar$sizeP.slideDuration;
  var amount = parseMetricToNum(daySize) * weeks;
  var translateYFrom = direction === 'down' ? "-" + amount + "px" : '0';
  var translateYTo = direction === 'up' ? "-" + amount + "px" : '0';
  var slideTransition = css(["0%{transform:translateY(", ");}100%{transform:translateY(", ");}"], translateYFrom, translateYTo);
  return css(["animation:", " ", " forwards;"], keyframes(["", ""], slideTransition), slideDuration);
};

export var StyledWeeks = styled.div.withConfig({
  displayName: "StyledCalendar__StyledWeeks",
  componentId: "sc-1y4xhmp-2"
})(["position:relative;", ";"], function (props) {
  return props.slide && slideStyle(props);
});
export var StyledWeek = styled.div.withConfig({
  displayName: "StyledCalendar__StyledWeek",
  componentId: "sc-1y4xhmp-3"
})(["display:flex;flex-direction:row;flex-justify:between;"]);
export var StyledDayContainer = styled.div.withConfig({
  displayName: "StyledCalendar__StyledDayContainer",
  componentId: "sc-1y4xhmp-4"
})(["flex:0 0 auto;"]);

var daySizeStyle = function daySizeStyle(props) {
  var data = props.theme.calendar[props.sizeProp];
  return css(["width:", ";height:", ";"], data.daySize, data.daySize);
};

export var StyledDay = styled.div.withConfig({
  displayName: "StyledCalendar__StyledDay",
  componentId: "sc-1y4xhmp-5"
})(["display:flex;justify-content:center;align-items:center;", " ", " ", " ", ""], function (props) {
  return daySizeStyle(props);
}, function (props) {
  return props.isSelected && backgroundStyle('control', props.theme) || props.inRange && backgroundStyle({
    color: 'control',
    opacity: 'weak'
  }, props.theme);
}, function (props) {
  return props.otherMonth && 'opacity: 0.5;';
}, function (props) {
  return props.isSelected && 'font-weight: bold;';
});