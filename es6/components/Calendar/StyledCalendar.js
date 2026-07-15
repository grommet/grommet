import styled, { css, keyframes } from 'styled-components';
import { Button } from '../Button';
import { backgroundStyle, disabledStyle, focusStyle, genericStyles, kindPartStyles, normalizeColor, parseMetricToNum, roundStyle, styledComponentsConfig } from '../../utils';
import { breakpointStyle } from '../../utils/mixins';
var responsiveSizeStyle = function responsiveSizeStyle(props) {
  var breakpoint = props.theme.global.size[props.sizeProp];
  return breakpointStyle({
    value: breakpoint
  }, "\n    width: 100vw;\n    max-width: " + breakpoint + ";\n  ", true);
};
var sizeStyle = function sizeStyle(props) {
  var data = props.theme.calendar[props.sizeProp];
  var width = props.fillContainer ? '100%' : props.theme.global.size[props.sizeProp];
  return css(["font-size:", ";line-height:", ";width:", ";", ""], data.fontSize, data.lineHeight, width, function (p) {
    return p.fillContainer && 'height: 100%;';
  });
};
var StyledCalendar = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledCalendar",
  componentId: "sc-1y4xhmp-0"
})(["", " ", " ", " ", ""], genericStyles, function (props) {
  return sizeStyle(props);
}, function (props) {
  return props.responsive && responsiveSizeStyle(props);
}, function (props) {
  return props.theme.calendar && props.theme.calendar.extend;
});
var weeksContainerSizeStyle = function weeksContainerSizeStyle(props) {
  var height = props.fillContainer ? '100%' : parseMetricToNum(props.theme.calendar[props.sizeProp].daySize) * 6 + "px";
  return "\n    height: " + height + ";\n\n  ";
};
var weeksContainerResponsiveSizeStyle = function weeksContainerResponsiveSizeStyle(props) {
  var breakpoint = props.theme.global.size[props.sizeProp];
  // set aspect-ratio to 7 days by 6 weeks
  return breakpointStyle({
    value: breakpoint
  }, "\n    height: auto;\n    aspect-ratio: 7/6;\n    ", true);
};
var StyledWeeksContainer = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledCalendar__StyledWeeksContainer",
  componentId: "sc-1y4xhmp-1"
})(["overflow:hidden;", " ", " ", ";"], function (props) {
  return weeksContainerSizeStyle(props);
}, function (props) {
  return props.responsive && weeksContainerResponsiveSizeStyle(props);
}, function (props) {
  return props.focus && !props.plain && focusStyle();
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
var weeksSizeStyle = function weeksSizeStyle() {
  return css(["display:flex;flex-direction:column;height:100%;"]);
};

// fallback to medium if no size-specific styles
var rangeRoundStyle = function rangeRoundStyle(props) {
  var _props$theme$calendar5, _props$theme$calendar6;
  var themeObj;
  if (props.isSelected) {
    var _props$theme$calendar, _props$theme$calendar2, _props$theme$calendar3, _props$theme$calendar4;
    var rangeStart = ((_props$theme$calendar = props.theme.calendar) == null || (_props$theme$calendar = _props$theme$calendar[props.sizeProp]) == null || (_props$theme$calendar = _props$theme$calendar.range) == null || (_props$theme$calendar = _props$theme$calendar.start) == null ? void 0 : _props$theme$calendar.round) || ((_props$theme$calendar2 = props.theme.calendar) == null || (_props$theme$calendar2 = _props$theme$calendar2.medium) == null || (_props$theme$calendar2 = _props$theme$calendar2.range) == null || (_props$theme$calendar2 = _props$theme$calendar2.start) == null ? void 0 : _props$theme$calendar2.round);
    var rangeEnd = ((_props$theme$calendar3 = props.theme.calendar) == null || (_props$theme$calendar3 = _props$theme$calendar3[props.sizeProp]) == null || (_props$theme$calendar3 = _props$theme$calendar3.range) == null || (_props$theme$calendar3 = _props$theme$calendar3.end) == null ? void 0 : _props$theme$calendar3.round) || ((_props$theme$calendar4 = props.theme.calendar) == null || (_props$theme$calendar4 = _props$theme$calendar4.medium) == null || (_props$theme$calendar4 = _props$theme$calendar4.range) == null || (_props$theme$calendar4 = _props$theme$calendar4.end) == null ? void 0 : _props$theme$calendar4.round);
    if (props.rangePosition === 'start' && rangeStart) {
      themeObj = rangeStart;
    } else if (props.rangePosition === 'end' && rangeEnd) themeObj = rangeEnd;
  } else themeObj = ((_props$theme$calendar5 = props.theme.calendar) == null || (_props$theme$calendar5 = _props$theme$calendar5[props.sizeProp]) == null || (_props$theme$calendar5 = _props$theme$calendar5.range) == null ? void 0 : _props$theme$calendar5.round) || ((_props$theme$calendar6 = props.theme.calendar) == null || (_props$theme$calendar6 = _props$theme$calendar6.medium) == null || (_props$theme$calendar6 = _props$theme$calendar6.range) == null ? void 0 : _props$theme$calendar6.round);
  return themeObj && [roundStyle(themeObj, props.responsive, props.theme)];
};
var StyledWeeks = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledCalendar__StyledWeeks",
  componentId: "sc-1y4xhmp-2"
})(["position:relative;", " ", ";"], function (props) {
  return props.fillContainer && weeksSizeStyle();
}, function (props) {
  return props.slide && slideStyle(props);
});
var StyledWeek = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledCalendar__StyledWeek",
  componentId: "sc-1y4xhmp-3"
})(["display:flex;justify-content:space-between;", ""], function (props) {
  return props.fillContainer && 'flex: 1;';
});
var responsiveDayContainerStyle = function responsiveDayContainerStyle(props) {
  var breakpoint = props.theme.global.size[props.sizeProp];
  return breakpointStyle({
    value: breakpoint
  }, "\n    width: 14.3%;\n  ", true);
};

// The width of 14.3% is derived from dividing 100/7. We want the
// widths of 7 days to equally fill 100% of the row.
var StyledDayContainer = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledCalendar__StyledDayContainer",
  componentId: "sc-1y4xhmp-4"
})(["flex:0 1 auto;", " ", " ", " ", ""], function (props) {
  return props.fillContainer && 'width: 14.3%;';
}, function (props) {
  var _props$theme$calendar7;
  return (props.inRange || props.isSelected && props.rangePosition) && ((_props$theme$calendar7 = props.theme.calendar) == null || (_props$theme$calendar7 = _props$theme$calendar7.range) == null ? void 0 : _props$theme$calendar7.background) && backgroundStyle(props.theme.calendar.range.background, props.theme);
}, function (props) {
  return rangeRoundStyle(props);
}, function (props) {
  return props.responsive && responsiveDayContainerStyle(props);
});
var responsiveDayButtonStyle = function responsiveDayButtonStyle(props) {
  var breakpoint = props.theme.global.size[props.sizeProp];
  return breakpointStyle({
    value: breakpoint
  }, "\n    width: 100%;\n  ", true);
};

// when caller opts in to day hover styling, apply all state styles
// on CalendarDay instead of active state on CalendarDayButton
// position relative and z-index are added to prevent the focus
// indicator from getting cut off
var StyledDayButton = styled(Button).withConfig({
  displayName: "StyledCalendar__StyledDayButton",
  componentId: "sc-1y4xhmp-5"
})(["&:focus{position:relative;z-index:1;}", " ", ""], function (props) {
  return props.disabledProp && disabledStyle(props.theme.button.disabled.opacity);
}, function (props) {
  return props.responsive && responsiveDayButtonStyle(props);
});
var daySizeStyle = function daySizeStyle(props) {
  var data = props.theme.calendar[props.sizeProp];
  return css(["width:", ";height:", ";"], props.fillContainer ? '100%' : data.daySize, props.fillContainer ? '100%' : data.daySize);
};
var responsiveDaySizeStyle = function responsiveDaySizeStyle(props) {
  var breakpoint = props.theme.global.size[props.sizeProp];
  var data = props.theme.calendar[props.sizeProp];
  return breakpointStyle({
    value: breakpoint
  }, "\n      width: 100%;\n      max-width: " + data.daySize + ";\n      height: auto;\n      aspect-ratio: 1;\n    ", true);
};
var dayStyle = function dayStyle(props) {
  var backgroundObj;
  var colorObj;
  if (props.isSelected) {
    var _props$theme$calendar8, _props$theme$calendar9;
    backgroundObj = ((_props$theme$calendar8 = props.theme.calendar.day) == null || (_props$theme$calendar8 = _props$theme$calendar8.selected) == null ? void 0 : _props$theme$calendar8.background) || 'control';
    colorObj = (_props$theme$calendar9 = props.theme.calendar.day) == null || (_props$theme$calendar9 = _props$theme$calendar9.selected) == null ? void 0 : _props$theme$calendar9.color;
  } else if (props.inRange) {
    var _props$theme$calendar0, _props$theme$calendar1, _props$theme$calendar10, _props$theme$calendar11;
    // for backwards compatability, only apply this if caller hasn't specified
    // range specific rounding
    // if they have, background will be applied to StyledDayContainer
    backgroundObj = !((_props$theme$calendar0 = props.theme.calendar) != null && (_props$theme$calendar0 = _props$theme$calendar0[props.sizeProp]) != null && (_props$theme$calendar0 = _props$theme$calendar0.range) != null && _props$theme$calendar0.round) && !((_props$theme$calendar1 = props.theme.calendar) != null && (_props$theme$calendar1 = _props$theme$calendar1.medium.range) != null && _props$theme$calendar1.round) && (((_props$theme$calendar10 = props.theme.calendar.day) == null || (_props$theme$calendar10 = _props$theme$calendar10.inRange) == null ? void 0 : _props$theme$calendar10.background) || {
      color: 'control',
      opacity: 'weak'
    });
    colorObj = (_props$theme$calendar11 = props.theme.calendar.day) == null || (_props$theme$calendar11 = _props$theme$calendar11.inRange) == null ? void 0 : _props$theme$calendar11.color;
  } else {
    var _props$theme$calendar12, _props$theme$calendar13;
    backgroundObj = (_props$theme$calendar12 = props.theme.calendar.day) == null ? void 0 : _props$theme$calendar12.background;
    colorObj = (_props$theme$calendar13 = props.theme.calendar.day) == null ? void 0 : _props$theme$calendar13.color;
  }
  if (colorObj && !backgroundObj) return "color: " + normalizeColor(colorObj, props.theme) + ";";
  return backgroundStyle(backgroundObj, props.theme, colorObj);
};
var dayHoverStyle = function dayHoverStyle(props) {
  var backgroundObj;
  var colorObj;
  if (props.isSelected) {
    var _props$theme$calendar14, _props$theme$calendar15;
    backgroundObj = (_props$theme$calendar14 = props.theme.calendar.day) == null || (_props$theme$calendar14 = _props$theme$calendar14.selected) == null || (_props$theme$calendar14 = _props$theme$calendar14.hover) == null ? void 0 : _props$theme$calendar14.background;
    colorObj = (_props$theme$calendar15 = props.theme.calendar.day) == null || (_props$theme$calendar15 = _props$theme$calendar15.selected) == null || (_props$theme$calendar15 = _props$theme$calendar15.hover) == null ? void 0 : _props$theme$calendar15.color;
  } else if (props.inRange) {
    var _props$theme$calendar16, _props$theme$calendar17;
    backgroundObj = (_props$theme$calendar16 = props.theme.calendar.day) == null || (_props$theme$calendar16 = _props$theme$calendar16.inRange) == null || (_props$theme$calendar16 = _props$theme$calendar16.hover) == null ? void 0 : _props$theme$calendar16.background;
    colorObj = (_props$theme$calendar17 = props.theme.calendar.day) == null || (_props$theme$calendar17 = _props$theme$calendar17.inRange) == null || (_props$theme$calendar17 = _props$theme$calendar17.hover) == null ? void 0 : _props$theme$calendar17.color;
  } else {
    var _props$theme$calendar18, _props$theme$calendar19;
    backgroundObj = (_props$theme$calendar18 = props.theme.calendar.day) == null || (_props$theme$calendar18 = _props$theme$calendar18.hover) == null ? void 0 : _props$theme$calendar18.background;
    colorObj = (_props$theme$calendar19 = props.theme.calendar.day) == null || (_props$theme$calendar19 = _props$theme$calendar19.hover) == null ? void 0 : _props$theme$calendar19.color;
  }
  if (colorObj && !backgroundObj) return "color: " + normalizeColor(colorObj, props.theme) + ";";
  return backgroundStyle(backgroundObj, props.theme, colorObj);
};
var dayFontStyle = function dayFontStyle(props) {
  var fontWeight;
  if (props.isSelected) {
    var _props$theme$calendar20;
    fontWeight = (_props$theme$calendar20 = props.theme.calendar.day) == null || (_props$theme$calendar20 = _props$theme$calendar20.selected) == null || (_props$theme$calendar20 = _props$theme$calendar20.font) == null ? void 0 : _props$theme$calendar20.weight;
  } else if (props.inRange) {
    var _props$theme$calendar21;
    fontWeight = (_props$theme$calendar21 = props.theme.calendar.day) == null || (_props$theme$calendar21 = _props$theme$calendar21.inRange) == null || (_props$theme$calendar21 = _props$theme$calendar21.font) == null ? void 0 : _props$theme$calendar21.weight;
  }
  return fontWeight && "font-weight: " + fontWeight + ";";
};
var StyledDay = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledCalendar__StyledDay",
  componentId: "sc-1y4xhmp-6"
})(["display:flex;justify-content:center;align-items:center;color:", ";", " ", " ", " ", " ", " ", " ", " ", ""], function (props) {
  var _props$theme$calendar22;
  return normalizeColor(props.otherMonth ? ((_props$theme$calendar22 = props.theme.calendar) == null || (_props$theme$calendar22 = _props$theme$calendar22.day) == null || (_props$theme$calendar22 = _props$theme$calendar22.adjacent) == null ? void 0 : _props$theme$calendar22.color) || 'text-xweak' : 'text-strong', props.theme);
}, function (props) {
  return daySizeStyle(props);
}, function (props) {
  return props.responsive && responsiveDaySizeStyle(props);
}, function (props) {
  return dayStyle(props);
}, function (props) {
  return dayFontStyle(props);
}, function (props) {
  var _props$theme$calendar23, _props$theme$calendar24;
  // fallback to medium if no size-specific styles
  var round = ((_props$theme$calendar23 = props.theme.calendar) == null || (_props$theme$calendar23 = _props$theme$calendar23[props.sizeProp]) == null || (_props$theme$calendar23 = _props$theme$calendar23.day) == null ? void 0 : _props$theme$calendar23.round) || ((_props$theme$calendar24 = props.theme.calendar) == null || (_props$theme$calendar24 = _props$theme$calendar24.medium) == null || (_props$theme$calendar24 = _props$theme$calendar24.day) == null ? void 0 : _props$theme$calendar24.round);
  return round && roundStyle(round, props.responsive, props.theme);
}, function (props) {
  return props.hover && !props.disabledProp && dayHoverStyle(props);
}, function (props) {
  return (
    // when theme uses kind Buttons, since we use children for Button,
    // we have to special case how we handle disabled days here
    props.disabledProp && props.theme.button["default"] && kindPartStyles(props.theme.button.disabled, props.theme)
  );
}, function (props) {
  return props.theme.calendar && props.theme.calendar.day && props.theme.calendar.day.extend;
});
export { StyledCalendar, StyledWeeksContainer, StyledWeeks, StyledWeek, StyledDayContainer, StyledDayButton, StyledDay };