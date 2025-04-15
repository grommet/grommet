"use strict";

exports.__esModule = true;
exports.StyledWeeksContainer = exports.StyledWeeks = exports.StyledWeek = exports.StyledDayContainer = exports.StyledDayButton = exports.StyledDay = exports.StyledCalendar = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _Button = require("../Button");
var _utils = require("../../utils");
var _background = require("../../utils/background");
var _mixins = require("../../utils/mixins");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var responsiveSizeStyle = function responsiveSizeStyle(props) {
  var breakpoint = props.theme.global.size[props.sizeProp];
  return (0, _mixins.breakpointStyle)({
    value: breakpoint
  }, "\n    width: 100vw;\n    max-width: " + breakpoint + ";\n  ", true);
};
var sizeStyle = function sizeStyle(props) {
  var data = props.theme.calendar[props.sizeProp];
  var width = props.fillContainer ? '100%' : props.theme.global.size[props.sizeProp];
  return (0, _styledComponents.css)(["font-size:", ";line-height:", ";width:", ";", ""], data.fontSize, data.lineHeight, width, function (p) {
    return p.fillContainer && 'height: 100%;';
  });
};
var StyledCalendar = exports.StyledCalendar = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledCalendar",
  componentId: "sc-1y4xhmp-0"
})(["", " ", " ", " ", ""], _utils.genericStyles, function (props) {
  return sizeStyle(props);
}, function (props) {
  return props.responsive && responsiveSizeStyle(props);
}, function (props) {
  return props.theme.calendar && props.theme.calendar.extend;
});
var weeksContainerSizeStyle = function weeksContainerSizeStyle(props) {
  var height = props.fillContainer ? '100%' : (0, _utils.parseMetricToNum)(props.theme.calendar[props.sizeProp].daySize) * 6 + "px";
  return "\n    height: " + height + ";\n\n  ";
};
var weeksContainerResponsiveSizeStyle = function weeksContainerResponsiveSizeStyle(props) {
  var breakpoint = props.theme.global.size[props.sizeProp];
  // set aspect-ratio to 7 days by 6 weeks
  return (0, _mixins.breakpointStyle)({
    value: breakpoint
  }, "\n    height: auto;\n    aspect-ratio: 7/6;\n    ", true);
};
var StyledWeeksContainer = exports.StyledWeeksContainer = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledCalendar__StyledWeeksContainer",
  componentId: "sc-1y4xhmp-1"
})(["overflow:hidden;", " ", " ", ";"], function (props) {
  return weeksContainerSizeStyle(props);
}, function (props) {
  return props.responsive && weeksContainerResponsiveSizeStyle(props);
}, function (props) {
  return props.focus && !props.plain && (0, _utils.focusStyle)();
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
  var amount = (0, _utils.parseMetricToNum)(daySize) * weeks;
  var translateYFrom = direction === 'down' ? "-" + amount + "px" : '0';
  var translateYTo = direction === 'up' ? "-" + amount + "px" : '0';
  var slideTransition = (0, _styledComponents.css)(["0%{transform:translateY(", ");}100%{transform:translateY(", ");}"], translateYFrom, translateYTo);
  return (0, _styledComponents.css)(["animation:", " ", " forwards;"], (0, _styledComponents.keyframes)(["", ""], slideTransition), slideDuration);
};
var weeksSizeStyle = function weeksSizeStyle() {
  return (0, _styledComponents.css)(["display:flex;flex-direction:column;height:100%;"]);
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
  return themeObj && [(0, _utils.roundStyle)(themeObj, props.responsive, props.theme), 'overflow: hidden;'];
};
var StyledWeeks = exports.StyledWeeks = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledCalendar__StyledWeeks",
  componentId: "sc-1y4xhmp-2"
})(["position:relative;", " ", ";"], function (props) {
  return props.fillContainer && weeksSizeStyle();
}, function (props) {
  return props.slide && slideStyle(props);
});
var StyledWeek = exports.StyledWeek = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledCalendar__StyledWeek",
  componentId: "sc-1y4xhmp-3"
})(["display:flex;justify-content:space-between;", ""], function (props) {
  return props.fillContainer && 'flex: 1;';
});
var responsiveDayContainerStyle = function responsiveDayContainerStyle(props) {
  var breakpoint = props.theme.global.size[props.sizeProp];
  return (0, _mixins.breakpointStyle)({
    value: breakpoint
  }, "\n    width: 14.3%;\n  ", true);
};

// The width of 14.3% is derived from dividing 100/7. We want the
// widths of 7 days to equally fill 100% of the row.
var StyledDayContainer = exports.StyledDayContainer = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledCalendar__StyledDayContainer",
  componentId: "sc-1y4xhmp-4"
})(["flex:0 1 auto;", " ", " ", " ", ""], function (props) {
  return props.fillContainer && 'width: 14.3%;';
}, function (props) {
  var _props$theme$calendar7;
  return (props.inRange || props.isSelected && props.rangePosition) && ((_props$theme$calendar7 = props.theme.calendar) == null || (_props$theme$calendar7 = _props$theme$calendar7.range) == null ? void 0 : _props$theme$calendar7.background) && (0, _utils.backgroundStyle)(props.theme.calendar.range.background, props.theme);
}, function (props) {
  return rangeRoundStyle(props);
}, function (props) {
  return props.responsive && responsiveDayContainerStyle(props);
});
var responsiveDayButtonStyle = function responsiveDayButtonStyle(props) {
  var breakpoint = props.theme.global.size[props.sizeProp];
  return (0, _mixins.breakpointStyle)({
    value: breakpoint
  }, "\n    width: 100%;\n  ", true);
};

// when caller opts in to day hover styling, apply all state styles
// on CalendarDay instead of active state on CalendarDayButton
var StyledDayButton = exports.StyledDayButton = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "StyledCalendar__StyledDayButton",
  componentId: "sc-1y4xhmp-5"
})(["", " ", ""], function (props) {
  var _props$theme$calendar8;
  return ((_props$theme$calendar8 = props.theme.calendar) == null || (_props$theme$calendar8 = _props$theme$calendar8.day) == null || (_props$theme$calendar8 = _props$theme$calendar8.hover) == null ? void 0 : _props$theme$calendar8.background) && 'background: inherit;';
}, function (props) {
  return props.responsive && responsiveDayButtonStyle(props);
});
var daySizeStyle = function daySizeStyle(props) {
  var data = props.theme.calendar[props.sizeProp];
  return (0, _styledComponents.css)(["width:", ";height:", ";"], props.fillContainer ? '100%' : data.daySize, props.fillContainer ? '100%' : data.daySize);
};
var responsiveDaySizeStyle = function responsiveDaySizeStyle(props) {
  var breakpoint = props.theme.global.size[props.sizeProp];
  var data = props.theme.calendar[props.sizeProp];
  return (0, _mixins.breakpointStyle)({
    value: breakpoint
  }, "\n      width: 100%;\n      max-width: " + data.daySize + ";\n      height: auto;\n      aspect-ratio: 1;\n    ", true);
};
var dayStyle = function dayStyle(props) {
  var backgroundObj;
  var colorObj;
  if (props.isSelected) {
    var _props$theme$calendar9, _props$theme$calendar10;
    backgroundObj = ((_props$theme$calendar9 = props.theme.calendar.day) == null || (_props$theme$calendar9 = _props$theme$calendar9.selected) == null ? void 0 : _props$theme$calendar9.background) || 'control';
    colorObj = (_props$theme$calendar10 = props.theme.calendar.day) == null || (_props$theme$calendar10 = _props$theme$calendar10.selected) == null ? void 0 : _props$theme$calendar10.color;
  } else if (props.inRange) {
    var _props$theme$calendar11, _props$theme$calendar12, _props$theme$calendar13, _props$theme$calendar14;
    // for backwards compatability, only apply this if caller hasn't specified
    // range specific rounding
    // if they have, background will be applied to StyledDayContainer
    backgroundObj = !((_props$theme$calendar11 = props.theme.calendar) != null && (_props$theme$calendar11 = _props$theme$calendar11[props.sizeProp]) != null && (_props$theme$calendar11 = _props$theme$calendar11.range) != null && _props$theme$calendar11.round) && !((_props$theme$calendar12 = props.theme.calendar) != null && (_props$theme$calendar12 = _props$theme$calendar12.medium.range) != null && _props$theme$calendar12.round) && (((_props$theme$calendar13 = props.theme.calendar.day) == null || (_props$theme$calendar13 = _props$theme$calendar13.inRange) == null ? void 0 : _props$theme$calendar13.background) || {
      color: 'control',
      opacity: 'weak'
    });
    colorObj = (_props$theme$calendar14 = props.theme.calendar.day) == null || (_props$theme$calendar14 = _props$theme$calendar14.inRange) == null ? void 0 : _props$theme$calendar14.color;
  } else {
    var _props$theme$calendar15, _props$theme$calendar16;
    backgroundObj = (_props$theme$calendar15 = props.theme.calendar.day) == null ? void 0 : _props$theme$calendar15.background;
    colorObj = (_props$theme$calendar16 = props.theme.calendar.day) == null ? void 0 : _props$theme$calendar16.color;
  }
  if (colorObj && !backgroundObj) return "color: " + (0, _utils.normalizeColor)(colorObj, props.theme) + ";";
  return (0, _utils.backgroundStyle)(backgroundObj, props.theme, colorObj);
};
var dayHoverStyle = function dayHoverStyle(props) {
  var backgroundObj;
  var colorObj;
  if (props.isSelected) {
    var _props$theme$calendar17, _props$theme$calendar18;
    backgroundObj = (_props$theme$calendar17 = props.theme.calendar.day) == null || (_props$theme$calendar17 = _props$theme$calendar17.selected) == null || (_props$theme$calendar17 = _props$theme$calendar17.hover) == null ? void 0 : _props$theme$calendar17.background;
    colorObj = (_props$theme$calendar18 = props.theme.calendar.day) == null || (_props$theme$calendar18 = _props$theme$calendar18.selected) == null || (_props$theme$calendar18 = _props$theme$calendar18.hover) == null ? void 0 : _props$theme$calendar18.color;
  } else if (props.inRange) {
    var _props$theme$calendar19, _props$theme$calendar20;
    backgroundObj = (_props$theme$calendar19 = props.theme.calendar.day) == null || (_props$theme$calendar19 = _props$theme$calendar19.inRange) == null || (_props$theme$calendar19 = _props$theme$calendar19.hover) == null ? void 0 : _props$theme$calendar19.background;
    colorObj = (_props$theme$calendar20 = props.theme.calendar.day) == null || (_props$theme$calendar20 = _props$theme$calendar20.inRange) == null || (_props$theme$calendar20 = _props$theme$calendar20.hover) == null ? void 0 : _props$theme$calendar20.color;
  } else {
    var _props$theme$calendar21, _props$theme$calendar22;
    backgroundObj = (_props$theme$calendar21 = props.theme.calendar.day) == null || (_props$theme$calendar21 = _props$theme$calendar21.hover) == null ? void 0 : _props$theme$calendar21.background;
    colorObj = (_props$theme$calendar22 = props.theme.calendar.day) == null || (_props$theme$calendar22 = _props$theme$calendar22.hover) == null ? void 0 : _props$theme$calendar22.color;
  }
  if (colorObj && !backgroundObj) return "color: " + (0, _utils.normalizeColor)(colorObj, props.theme) + ";";
  return (0, _utils.backgroundStyle)(backgroundObj, props.theme, colorObj);
};
var dayFontStyle = function dayFontStyle(props) {
  var fontWeight;
  if (props.isSelected) {
    var _props$theme$calendar23;
    fontWeight = (_props$theme$calendar23 = props.theme.calendar.day) == null || (_props$theme$calendar23 = _props$theme$calendar23.selected) == null || (_props$theme$calendar23 = _props$theme$calendar23.font) == null ? void 0 : _props$theme$calendar23.weight;
  } else if (props.inRange) {
    var _props$theme$calendar24;
    fontWeight = (_props$theme$calendar24 = props.theme.calendar.day) == null || (_props$theme$calendar24 = _props$theme$calendar24.inRange) == null || (_props$theme$calendar24 = _props$theme$calendar24.font) == null ? void 0 : _props$theme$calendar24.weight;
  }
  return fontWeight && "font-weight: " + fontWeight + ";";
};
var StyledDay = exports.StyledDay = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledCalendar__StyledDay",
  componentId: "sc-1y4xhmp-6"
})(["display:flex;justify-content:center;align-items:center;color:", ";", " ", " ", " ", " ", " ", " ", " ", " ", ""], function (props) {
  var _props$theme$calendar25;
  return (0, _utils.normalizeColor)(props.otherMonth ? ((_props$theme$calendar25 = props.theme.calendar) == null || (_props$theme$calendar25 = _props$theme$calendar25.day) == null || (_props$theme$calendar25 = _props$theme$calendar25.adjacent) == null ? void 0 : _props$theme$calendar25.color) || 'text-xweak' : 'text-strong', props.theme);
}, function (props) {
  return daySizeStyle(props);
}, function (props) {
  return props.responsive && responsiveDaySizeStyle(props);
}, function (props) {
  return dayStyle(props);
}, function (props) {
  return dayFontStyle(props);
}, function (props) {
  var _props$theme$calendar26, _props$theme$calendar27;
  // fallback to medium if no size-specific styles
  var round = ((_props$theme$calendar26 = props.theme.calendar) == null || (_props$theme$calendar26 = _props$theme$calendar26[props.sizeProp]) == null || (_props$theme$calendar26 = _props$theme$calendar26.day) == null ? void 0 : _props$theme$calendar26.round) || ((_props$theme$calendar27 = props.theme.calendar) == null || (_props$theme$calendar27 = _props$theme$calendar27.medium) == null || (_props$theme$calendar27 = _props$theme$calendar27.day) == null ? void 0 : _props$theme$calendar27.round);
  return round && (0, _utils.roundStyle)(round, props.responsive, props.theme);
}, function (props) {
  return props.active && _background.activeStyle;
}, function (props) {
  return props.hover && dayHoverStyle(props);
}, function (props) {
  return (
    // when theme uses kind Buttons, since we use children for Button,
    // we have to special case how we handle disabled days here
    props.disabledProp && props.theme.button["default"] && (0, _utils.kindPartStyles)(props.theme.button.disabled, props.theme)
  );
}, function (props) {
  return props.theme.calendar && props.theme.calendar.day && props.theme.calendar.day.extend;
});