"use strict";

exports.__esModule = true;
exports.StyledRangeInput = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var _defaultProps = require("../../default-props");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// opacity of the bound trumps the track opacity
var getBoundOpacity = function getBoundOpacity(props, bound) {
  return props.theme.rangeInput && props.theme.rangeInput.track && props.theme.rangeInput.track[bound] && props.theme.rangeInput.track[bound].opacity ? props.theme.rangeInput.track[bound].opacity : 1;
};
var getBoundColor = function getBoundColor(props, bound) {
  if (props.theme.rangeInput && props.theme.rangeInput.track && props.theme.rangeInput.track[bound] && props.theme.rangeInput.track[bound].color) {
    return (0, _utils.getRGBA)((0, _utils.normalizeColor)(props.theme.rangeInput.track[bound].color, props.theme), getBoundOpacity(props, bound));
  }
  // If bound color is undefined pick the default track color with bound opacity
  return (0, _utils.getRGBA)((0, _utils.normalizeColor)(props.theme.rangeInput.track.color, props.theme), getBoundOpacity(props, bound));
};
var trackColorStyle = function trackColorStyle(props) {
  var _props$theme$rangeInp, _props$theme$rangeInp2;
  var max = props.max,
    min = props.min;
  var thumbPosition = ((props.value || 0) - min) / (max - min) * 100 + "%";
  var defaultTrackColor;

  // backward compatibility in case no bounds are defined
  if (props.theme.rangeInput && props.theme.rangeInput.track && !props.theme.rangeInput.track.lower && !props.theme.rangeInput.track.upper) {
    var color = (0, _utils.getRGBA)((0, _utils.normalizeColor)(props.theme.rangeInput.track.color, props.theme), 0.2);
    // Since the track color was changed from border-with-opacity to just border
    // this condition is used to make sure we are applying the opacity correctly
    // for 'border' color (for backward compatibility purposes).
    if (color === 'rgba(0, 0, 0, 0.2)') {
      defaultTrackColor = color;
    }
    // no bounds are defined but color may have changed
    else {
      defaultTrackColor = (0, _utils.getRGBA)((0, _utils.normalizeColor)(props.theme.rangeInput.track.color, props.theme), props.theme.rangeInput.track.opacity || 1);
    }
    if (!props.color) return "background: " + defaultTrackColor;
  }
  var upperTrackColor = (_props$theme$rangeInp = props.theme.rangeInput.track) != null && _props$theme$rangeInp.upper ? getBoundColor(props, 'upper') : defaultTrackColor;
  var lowerTrackColor = (_props$theme$rangeInp2 = props.theme.rangeInput.track) != null && _props$theme$rangeInp2.lower ? getBoundColor(props, 'lower') : (0, _utils.getRGBA)((0, _utils.normalizeColor)(props.theme.global.colors.control, props.theme), props.theme.rangeInput.track.opacity || 1);
  if (typeof props.color === 'string' || typeof props.color === 'object' && !Array.isArray(props.color)) {
    lowerTrackColor = (0, _utils.normalizeColor)(props.color, props.theme);
    return "background: linear-gradient(\n        to right,\n        " + lowerTrackColor + ",\n        " + lowerTrackColor + " " + thumbPosition + ",\n        " + upperTrackColor + " " + thumbPosition + ",\n        " + upperTrackColor + "\n      );\n    ";
  }
  if (Array.isArray(props.color)) {
    var arrayOfTrackColors = props.color;
    var valuePercentage = 0;
    var result = "background: linear-gradient(to right,";
    for (var index = 0; index < arrayOfTrackColors.length; index += 1) {
      var _arrayOfTrackColors$i = arrayOfTrackColors[index],
        value = _arrayOfTrackColors$i.value,
        _color = _arrayOfTrackColors$i.color,
        opacity = _arrayOfTrackColors$i.opacity;
      result += (0, _utils.getRGBA)((0, _utils.normalizeColor)(_color, props.theme), opacity || 1) + " " + valuePercentage + "%,";
      if (props.value >= value) {
        valuePercentage = (value - min) / (max - min) * 100;
        result += (0, _utils.getRGBA)((0, _utils.normalizeColor)(_color, props.theme), opacity || 1) + " " + valuePercentage + "%,";
      } else {
        result += (0, _utils.getRGBA)((0, _utils.normalizeColor)(_color, props.theme), opacity || 1) + " " + thumbPosition + ",";
        result += upperTrackColor + " " + thumbPosition + ", " + upperTrackColor + ")";
        break;
      }
      if (index === arrayOfTrackColors.length - 1) {
        result += upperTrackColor + " " + valuePercentage + "%, " + upperTrackColor + ")";
      }
    }
    return result;
  }
  return "background: linear-gradient(\n      to right,\n      " + lowerTrackColor + ",\n      " + lowerTrackColor + " " + thumbPosition + ",\n      " + upperTrackColor + " " + thumbPosition + ",\n      " + upperTrackColor + "\n    );\n  ";
};
var disabledRangeInputStyle = function disabledRangeInputStyle(props, context) {
  var _props$theme$rangeInp3;
  return (0, _styledComponents.css)(["", " ", ""], (0, _utils.disabledStyle)(props.theme.rangeInput.disabled.opacity), ((_props$theme$rangeInp3 = props.theme.rangeInput.disabled[context]) == null ? void 0 : _props$theme$rangeInp3.color) && "background: " + (0, _utils.normalizeColor)(props.theme.rangeInput.disabled[context].color, props.theme) + ";");
};
var hoverStyle = function hoverStyle(props) {
  return (0, _styledComponents.css)(["box-shadow:0px 0px 0px 2px ", ";"], (0, _utils.normalizeColor)(props.theme.rangeInput.thumb.color || 'control', props.theme));
};
var rangeTrackStyle = (0, _styledComponents.css)(["box-sizing:border-box;width:100%;height:", ";", ";", " ", ";"], function (props) {
  return props.theme.rangeInput.track.height;
}, function (props) {
  return trackColorStyle(props);
}, function (props) {
  return props.theme.rangeInput && props.theme.rangeInput.track && props.theme.rangeInput.track.extend;
}, function (props) {
  var _props$theme;
  return props.disabled && ((_props$theme = props.theme) == null || (_props$theme = _props$theme.rangeInput) == null ? void 0 : _props$theme.disabled) && disabledRangeInputStyle(props, 'track');
});
var rangeThumbStyle = (0, _styledComponents.css)(["box-sizing:border-box;position:relative;border-radius:", ";height:", ";width:", ";overflow:visible;background:", ";-webkit-appearance:none;cursor:pointer;", " ", ";"], function (props) {
  return props.theme.global.spacing;
}, function (props) {
  return props.theme.global.spacing;
}, function (props) {
  return props.theme.global.spacing;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.rangeInput.thumb.color || 'control', props.theme);
}, function (props) {
  return props.theme.rangeInput && props.theme.rangeInput.thumb && props.theme.rangeInput.thumb.extend;
}, function (props) {
  var _props$theme2;
  return props.disabled && ((_props$theme2 = props.theme) == null || (_props$theme2 = _props$theme2.rangeInput) == null ? void 0 : _props$theme2.disabled) && disabledRangeInputStyle(props, 'thumb');
});
var firefoxMicrosoftThumbStyle = (0, _styledComponents.css)(["", " margin-top:0px;height:", ";width:", ";", " ", ""], rangeThumbStyle, function (props) {
  return props.theme.global.spacing;
}, function (props) {
  return props.theme.global.spacing;
}, function (props) {
  return props.focus && props.focusIndicator && (0, _utils.focusStyle)();
}, function (props) {
  return props.theme.rangeInput && props.theme.rangeInput.thumb && props.theme.rangeInput.thumb.extend;
});

/* eslint-disable max-len */
var StyledRangeInput = exports.StyledRangeInput = _styledComponents["default"].input.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledRangeInput",
  componentId: "sc-15st9ck-0"
})(["box-sizing:border-box;position:relative;-webkit-appearance:none;border-color:transparent;height:", ";width:100%;padding:0px;cursor:", ";background:transparent;margin:0px;", " &::-moz-focus-inner{border:none;}&::-moz-focus-outer{border:none;}&::-webkit-slider-runnable-track{", "}&::-webkit-slider-thumb{margin-top:-", "px;", " ", " ", "}&::-moz-range-track{", "}&::-moz-range-thumb{", "}&::-ms-thumb{", "}", " &::-ms-track{", " border-color:transparent;color:transparent;}&::-ms-fill-lower{", ";border-color:transparent;}&::-ms-fill-upper{", ";border-color:transparent;}&:focus::-webkit-slider-thumb{", "}&:focus-visible{outline:0;}&:focus{outline:none;}", ""], function (props) {
  return props.theme.global.spacing;
}, function (props) {
  return props.disabled ? 'default' : 'pointer';
}, function (props) {
  return props.theme.rangeInput.pad && (0, _utils.edgeStyle)('padding', props.theme.rangeInput.pad, props.responsive, props.theme.box.responsiveBreakpoint, props.theme);
}, rangeTrackStyle, function (props) {
  return ((0, _utils.parseMetricToNum)(props.theme.global.spacing) - (0, _utils.parseMetricToNum)(props.theme.rangeInput.track.height || 0)) * 0.5;
}, rangeThumbStyle, function (props) {
  return !props.disabled && (0, _styledComponents.css)(["&:hover{", "}"], hoverStyle(props));
}, function (props) {
  return props.focus && !props.focusIndicator && (0, _styledComponents.css)(["", ""], hoverStyle(props));
}, rangeTrackStyle, firefoxMicrosoftThumbStyle, firefoxMicrosoftThumbStyle, function (props) {
  return !props.disabled && (0, _styledComponents.css)(["&:hover::-moz-range-thumb{", "}&:hover::-ms-thumb{", "}"], hoverStyle(props), hoverStyle(props));
}, rangeTrackStyle, function (props) {
  return trackColorStyle(props, 'lower');
}, function (props) {
  return trackColorStyle(props, 'upper');
}, function (props) {
  return props.focus && props.focusIndicator && (0, _utils.focusStyle)();
}, function (props) {
  return props.theme.rangeInput && props.theme.rangeInput.extend;
});
/* eslint-enable max-len */

StyledRangeInput.defaultProps = {};
Object.setPrototypeOf(StyledRangeInput.defaultProps, _defaultProps.defaultProps);