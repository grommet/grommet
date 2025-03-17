"use strict";

exports.__esModule = true;
exports.widthStyle = exports.unfocusStyle = exports.textAlignStyle = exports.styledComponentsConfig = exports.sizeStyle = exports.roundStyle = exports.plainInputStyle = exports.overflowStyle = exports.kindPartStyles = exports.inputStyle = exports.inputPadForIcon = exports.heightStyle = exports.getInputPadBySide = exports.genericStyles = exports.focusStyle = exports.fillStyle = exports.elevationStyle = exports.edgeStyle = exports.disabledStyle = exports.controlBorderStyle = exports.baseStyle = exports.alignStyle = exports.alignContentStyle = void 0;
var _styledComponents = require("styled-components");
var _isPropValid = _interopRequireDefault(require("@emotion/is-prop-valid"));
var _background = require("./background");
var _colors = require("./colors");
var _responsive = require("./responsive");
var _mixins = require("./mixins");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// ensure only valid DOM attributes are forwarded onto DOM
var styledComponentsConfig = exports.styledComponentsConfig = {
  shouldForwardProp: _isPropValid["default"]
};
var baseStyle = exports.baseStyle = (0, _styledComponents.css)(["font-family:", ";font-size:", ";line-height:", ";font-weight:", ";", " ", " box-sizing:border-box;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;"], function (props) {
  return props.theme.global.font.family;
}, function (props) {
  return props.theme.global.font.size;
}, function (props) {
  return props.theme.global.font.height;
}, function (props) {
  return props.theme.global.font.weight;
}, function (props) {
  return props.theme.global.font.variant && "\n    font-variant:" + props.theme.global.font.variant + ";\n  ";
}, function (props) {
  return !props.plain && (0, _background.backgroundStyle)(props.theme.baseBackground, props.theme);
});
var controlBorderStyle = exports.controlBorderStyle = (0, _styledComponents.css)(["border:", " solid ", ";border-radius:", ";"], function (props) {
  return props.theme.global.control.border.width;
}, function (props) {
  return (0, _colors.normalizeColor)(props.theme.global.control.border.color || 'border', props.theme);
}, function (props) {
  return props.theme.global.control.border.radius;
});
var edgeStyle = exports.edgeStyle = function edgeStyle(kind, data, responsive, responsiveBreakpoint, theme) {
  var breakpoint = responsiveBreakpoint && theme.global.breakpoints[responsiveBreakpoint];
  if (typeof data === 'string') {
    return (0, _styledComponents.css)(["", ":", ";", ";"], kind, theme.global.edgeSize[data] || data, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n        " + kind + ": " + (breakpoint.edgeSize[data] || data) + ";\n      ", responsive) : '');
  }
  var result = [];
  var horizontal = data.horizontal,
    vertical = data.vertical,
    top = data.top,
    bottom = data.bottom,
    left = data.left,
    right = data.right;

  // if horizontal and vertical are equal OR all sides are equal,
  // we can just return a single css value such as padding: 12px
  // instead of breaking out by sides.
  var horizontalVerticalEqual = horizontal && vertical && horizontal === vertical;
  var allSidesEqual = top && bottom && left && right && top === bottom === left === right;
  if (horizontalVerticalEqual || allSidesEqual) {
    // since the values will be the same between vertical & horizontal OR
    // left, right, top, & bottom, we can just choose one
    var value = horizontalVerticalEqual ? horizontal : top;
    return (0, _styledComponents.css)(["", ":", ";", ";"], kind, theme.global.edgeSize[value] || value, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n        " + kind + ": " + (breakpoint.edgeSize[value] || value) + ";\n      ", responsive) : '');
  }
  if (horizontal) {
    result.push((0, _styledComponents.css)(["", "-left:", ";", "-right:", ";", ";"], kind, theme.global.edgeSize[horizontal] || horizontal, kind, theme.global.edgeSize[horizontal] || horizontal, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n          " + kind + "-left: " + (breakpoint.edgeSize[horizontal] || horizontal) + ";\n          " + kind + "-right: " + (breakpoint.edgeSize[horizontal] || horizontal) + ";\n        ", responsive) : ''));
  }
  if (vertical) {
    result.push((0, _styledComponents.css)(["", "-top:", ";", "-bottom:", ";", ";"], kind, theme.global.edgeSize[vertical] || vertical, kind, theme.global.edgeSize[vertical] || vertical, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n          " + kind + "-top: " + (breakpoint.edgeSize[vertical] || vertical) + ";\n          " + kind + "-bottom: " + (breakpoint.edgeSize[vertical] || vertical) + ";\n        ", responsive) : ''));
  }
  if (top) {
    result.push((0, _styledComponents.css)(["", "-top:", ";", ";"], kind, theme.global.edgeSize[top] || top, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n          " + kind + "-top: " + (breakpoint.edgeSize[top] || top) + ";\n        ", responsive) : ''));
  }
  if (bottom) {
    result.push((0, _styledComponents.css)(["", "-bottom:", ";", ";"], kind, theme.global.edgeSize[bottom] || bottom, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n          " + kind + "-bottom: " + (breakpoint.edgeSize[bottom] || bottom) + ";\n        ", responsive) : ''));
  }
  if (left) {
    result.push((0, _styledComponents.css)(["", "-left:", ";", ";"], kind, theme.global.edgeSize[left] || left, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n          " + kind + "-left: " + (breakpoint.edgeSize[left] || left) + ";\n        ", responsive) : ''));
  }
  if (right) {
    result.push((0, _styledComponents.css)(["", "-right:", ";", ";"], kind, theme.global.edgeSize[right] || right, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n          " + kind + "-right: " + (breakpoint.edgeSize[right] || right) + ";\n        ", responsive) : ''));
  }
  if (data.start) {
    result.push((0, _styledComponents.css)(["", "-inline-start:", ";", ";"], kind, theme.global.edgeSize[data.start] || data.start, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n          " + kind + "-inline-start: " + (breakpoint.edgeSize[data.start] || data.start) + ";\n        ", responsive) : ''));
  }
  if (data.end) {
    result.push((0, _styledComponents.css)(["", "-inline-end:", ";", ";"], kind, theme.global.edgeSize[data.end] || data.end, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n          " + kind + "-inline-end: " + (breakpoint.edgeSize[data.end] || data.end) + ";\n        ", responsive) : ''));
  }
  return result;
};
var fillStyle = exports.fillStyle = function fillStyle(fillProp) {
  if (fillProp === 'horizontal') {
    return 'width: 100%;';
  }
  if (fillProp === 'vertical') {
    return 'height: 100%;';
  }
  if (fillProp) {
    return "\n      width: 100%;\n      height: 100%;\n    ";
  }
  return undefined;
};
var focusStyles = function focusStyles(props, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    forceOutline = _ref.forceOutline,
    justBorder = _ref.justBorder;
  var focus = props.theme.global.focus;
  var compoundFocusStyle = '';
  if (!focus || forceOutline && !focus.outline) {
    var color = (0, _colors.normalizeColor)('focus', props.theme);
    if (color) return "outline: 2px solid " + color + ";";
    return ''; // native
  }
  if (focus.outline && (!focus.border || !justBorder)) {
    if (typeof focus.outline === 'object') {
      var _color = (0, _colors.normalizeColor)(focus.outline.color || 'focus', props.theme);
      var size = focus.outline.size || '2px';
      var offset = focus.outline.offset || '0px';
      var outlineStyle = "\n        outline-offset: " + offset + ";\n        outline: " + size + " solid " + _color + ";\n      ";
      compoundFocusStyle += outlineStyle;
      if (!focus.twoColor) return outlineStyle;
    } else {
      var _outlineStyle = "outline: " + focus.outline + ";";
      compoundFocusStyle += _outlineStyle;
      if (!focus.twoColor) return _outlineStyle;
    }
  }
  if (focus.shadow && (!focus.border || !justBorder)) {
    if (typeof focus.shadow === 'object') {
      var _color2 = (0, _colors.normalizeColor)(
      // If there is a focus.border.color, use that for shadow too.
      // This is for backwards compatibility in v2.
      focus.border && focus.border.color || focus.shadow.color || 'focus', props.theme);
      var _size = focus.shadow.size || '2px'; // backwards compatible default
      var blur = focus.shadow.blur || _size; // backwards compatible default
      var inset = focus.shadow.inset ? 'inset ' : '';
      var shadowStyle = "box-shadow: 0 0 " + blur + " " + _size + " " + _color2 + (inset ? " " + inset : '') + ";";
      compoundFocusStyle += shadowStyle;
      if (!focus.twoColor) return "\n        outline: none;\n      " + shadowStyle;
    } else {
      var _shadowStyle = "box-shadow: " + focus.shadow + ";";
      compoundFocusStyle += _shadowStyle;
      if (!focus.twoColor) return "outline: none; " + _shadowStyle;
    }
  }
  if (focus.border) {
    var _color3 = (0, _colors.normalizeColor)(focus.border.color || 'focus', props.theme);
    var borderStyle = "border-color: " + _color3 + ";";
    compoundFocusStyle += borderStyle;
    if (!focus.twoColor) return "outline: none; " + borderStyle;
  }
  if (focus.twoColor && compoundFocusStyle.length) return compoundFocusStyle;
  return ''; // defensive
};
var unfocusStyles = function unfocusStyles(props, _temp2) {
  var _ref2 = _temp2 === void 0 ? {} : _temp2,
    forceOutline = _ref2.forceOutline,
    justBorder = _ref2.justBorder;
  var focus = props.theme.global.focus;
  var compoundFocusStyle = '';
  if (!focus || forceOutline && !focus.outline) {
    var color = (0, _colors.normalizeColor)('focus', props.theme);
    if (color) return "outline: none;";
    return ''; // native
  }
  if (focus.outline && (!focus.border || !justBorder)) {
    if (typeof focus.outline === 'object') {
      var outlineStyle = "\n        outline-offset: 0px;\n        outline: none;\n      ";
      compoundFocusStyle += outlineStyle;
      if (!focus.twoColor) return "\n        outline-offset: 0px;\n        outline: none;\n      ";
    } else {
      var _outlineStyle2 = "outline: none;";
      compoundFocusStyle += _outlineStyle2;
      if (!focus.twoColor) return _outlineStyle2;
    }
  }
  if (focus.shadow && (!focus.border || !justBorder)) {
    if (typeof focus.shadow === 'object') {
      var shadowStyle = "\n        outline: none;\n        box-shadow: none;\n      ";
      compoundFocusStyle += shadowStyle;
      if (!focus.twoColor) return shadowStyle;
    } else {
      var _shadowStyle2 = "\n        outline: none;\n        box-shadow: none;\n      ";
      compoundFocusStyle += _shadowStyle2;
      if (!focus.twoColor) return _shadowStyle2;
    }
  }
  if (focus.border) {
    var borderStyle = "\n      outline: none;\n      border-color: none;\n    ";
    compoundFocusStyle += borderStyle;
    if (!focus.twoColor) return borderStyle;
  }
  if (focus.twoColor && compoundFocusStyle.length) return compoundFocusStyle;
  return ''; // defensive
};

// focus also supports clickable elements inside svg
var focusStyle = exports.focusStyle = function focusStyle(_temp3) {
  var _ref3 = _temp3 === void 0 ? {} : _temp3,
    forceOutline = _ref3.forceOutline,
    justBorder = _ref3.justBorder,
    skipSvgChildren = _ref3.skipSvgChildren;
  return (0, _styledComponents.css)(["", " ", " ", ""], function (props) {
    return !skipSvgChildren && "\n  > circle,\n  > ellipse,\n  > line,\n  > path,\n  > polygon,\n  > polyline,\n  > rect {\n    " + focusStyles(props) + "\n  }";
  }, function (props) {
    return focusStyles(props, {
      forceOutline: forceOutline,
      justBorder: justBorder
    });
  }, !forceOutline && "\n  ::-moz-focus-inner {\n    border: 0;\n  }\n  ");
};

// This is placed next to focusStyle for easy maintainability
// of code since changes to focusStyle should be reflected in
// unfocusStyle as well.
// this function can be used to reset focus styles which is
// applicable when turning the focus ring off when using the mouse
// see https://nelo.is/writing/styling-better-focus-states/
var unfocusStyle = exports.unfocusStyle = function unfocusStyle(_temp4) {
  var _ref4 = _temp4 === void 0 ? {} : _temp4,
    forceOutline = _ref4.forceOutline,
    justBorder = _ref4.justBorder,
    skipSvgChildren = _ref4.skipSvgChildren;
  return (0, _styledComponents.css)(["", " ", " ", ""], function (props) {
    return !skipSvgChildren && "\n  > circle,\n  > ellipse,\n  > line,\n  > path,\n  > polygon,\n  > polyline,\n  > rect {\n    " + unfocusStyles(props) + "\n  }";
  }, function (props) {
    return unfocusStyles(props, {
      forceOutline: forceOutline,
      justBorder: justBorder
    });
  }, !forceOutline && "\n  ::-moz-focus-inner {\n    border: 0;\n  }\n  ");
};

// For backwards compatibility we need to add back the control border width.
// Based on how grommet was functioning prior to https://github.com/grommet/grommet/pull/3939,
// the padding was subtracting the border width from the theme value, but the
// placeholder was not. Because we're now placing the subtraction into the
// theme itself, we have to add back in the border width here.
// This is used for placeholder/icon in TextInput and MaskedInput.
var adjustPad = function adjustPad(props, value) {
  return (0, _mixins.parseMetricToNum)((props.theme.global.edgeSize[value] || value) + "px") + (0, _mixins.parseMetricToNum)(props.theme.global.control.border.width + "px") + "px";
};
var getInputPadBySide = exports.getInputPadBySide = function getInputPadBySide(props, side) {
  if (typeof props.theme.global.input.padding !== 'object') {
    var _adjustedPad = adjustPad(props, props.theme.global.input.padding);
    return _adjustedPad;
  }
  var orientation;
  if (side === 'left' || side === 'right') orientation = 'horizontal';else if (side === 'top' || side === 'bottom') orientation = 'vertical';else orientation = undefined;

  // if individual side isn't available, fallback to the
  // orientation if possible
  var pad = props.theme.global.input.padding[side] || props.theme.global.input.padding[orientation];
  var adjustedPad = adjustPad(props, pad);
  return adjustedPad;
};
var placeholderColor = (0, _styledComponents.css)(["color:", ";"], function (props) {
  return (0, _colors.normalizeColor)(props.theme.global.colors.placeholder, props.theme);
});
var placeholderStyle = (0, _styledComponents.css)(["&::-webkit-input-placeholder{", ";}&::-moz-placeholder{", ";}&:-ms-input-placeholder{", ";}"], placeholderColor, placeholderColor, placeholderColor);
var inputSizeStyle = function inputSizeStyle(props) {
  var data = props.theme.text[props.size];
  if (!data) {
    return (0, _styledComponents.css)(["font-size:", ";"], props.size);
  }
  return (0, _styledComponents.css)(["font-size:", ";line-height:", ";"], data.size, data.height);
};
var inputStyle = exports.inputStyle = (0, _styledComponents.css)(["box-sizing:border-box;", " font-family:inherit;border:none;-webkit-appearance:none;background:transparent;color:inherit;width:100%;", " ", " ", " margin:0;", " &:focus{", ";}", " ", " ::-webkit-search-decoration{-webkit-appearance:none;}&::-moz-focus-inner{border:none;outline:none;}&:-moz-placeholder,&::-moz-placeholder{opacity:1;}", ""], function (props) {
  var _props$theme$text$pro;
  return "font-size: " + (props.theme.global.input.font.size ? ((_props$theme$text$pro = props.theme.text[props.theme.global.input.font.size]) == null ? void 0 : _props$theme$text$pro.size) || props.theme.global.input.font.size : 'inherit') + ";";
}, function (props) {
  return props.theme.global.input.font.height && "line-height: " + props.theme.global.input.font.height + ";";
}, function (props) {
  return props.theme.global.input.padding && typeof props.theme.global.input.padding !== 'object' ? // On a breaking change release, this condition could be removed and
  // just the edgeStyle could remain. Currently, this is needed for
  // backwards compatibility since we are placing the calculation in
  // base.js
  "padding: " + ((0, _mixins.parseMetricToNum)(props.theme.global.edgeSize[props.theme.global.input.padding] || props.theme.global.input.padding) - (0, _mixins.parseMetricToNum)(props.theme.global.control.border.width)) + "px;" : edgeStyle('padding', props.theme.global.input.padding, props.responsive, props.theme.box.responsiveBreakpoint, props.theme);
}, function (props) {
  return (
    // for backwards compatibility, check if props.theme.global.input.weight
    (props.theme.global.input.weight || props.theme.global.input.font.weight) && (0, _styledComponents.css)(["font-weight:", ";"], props.theme.global.input.weight || props.theme.global.input.font.weight)
  );
}, function (props) {
  return props.size && inputSizeStyle(props);
}, function (props) {
  return (!props.plain || props.focusIndicator) && focusStyle();
}, controlBorderStyle, placeholderStyle, function (props) {
  return props.theme.global.input.extend;
});

// Apply padding on input to create space for icon.
// When theme.icon.matchSize is true, the space for the
// icon should equal the icon dimension + 12px (edgeSize.medium)
// to ensure there is reasonable space between the icon and value or placeholder
var inputPadForIcon = exports.inputPadForIcon = (0, _styledComponents.css)(["", ""], function (props) {
  var _props$theme, _props$theme$icon;
  var pad = (_props$theme = props.theme) != null && (_props$theme = _props$theme.icon) != null && _props$theme.matchSize ? (0, _mixins.parseMetricToNum)((_props$theme$icon = props.theme.icon) == null || (_props$theme$icon = _props$theme$icon.size) == null ? void 0 : _props$theme$icon[(props == null ? void 0 : props.size) || 'medium']) + (0, _mixins.parseMetricToNum)(props.theme.global.edgeSize.medium) + "px" : props.theme.global.edgeSize.large;
  return props.reverse ? "padding-right: " + pad + ";" : "padding-left: " + pad + ";";
});
var overflowStyle = exports.overflowStyle = function overflowStyle(overflowProp) {
  if (typeof overflowProp === 'string') {
    return (0, _styledComponents.css)(["overflow:", ";"], overflowProp);
  }
  return (0, _styledComponents.css)(["", " ", ";"], overflowProp.horizontal && "overflow-x: " + overflowProp.horizontal + ";", overflowProp.vertical && "overflow-y: " + overflowProp.vertical + ";");
};
var ALIGN_SELF_MAP = {
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
  baseline: 'baseline'
};
var genericStyles = exports.genericStyles = (0, _styledComponents.css)(["", " ", " ", ""], function (props) {
  return props.alignSelf && "align-self: " + ALIGN_SELF_MAP[props.alignSelf] + ";";
}, function (props) {
  return props.gridArea && "grid-area: " + props.gridArea + ";";
}, function (props) {
  return props.margin && props.theme.global && edgeStyle('margin', props.margin, props.responsive, props.theme.global.edgeSize.responsiveBreakpoint, props.theme);
});
var disabledStyle = exports.disabledStyle = function disabledStyle(componentStyle) {
  return (0, _styledComponents.css)(["opacity:", ";cursor:default;"], function (props) {
    return componentStyle || props.theme.global.control.disabled.opacity;
  });
};
var sizeStyle = exports.sizeStyle = function sizeStyle(name, value, theme) {
  return (0, _styledComponents.css)(["", ":", ";"], name, theme.global.size[value] || value);
};
var plainInputStyle = exports.plainInputStyle = (0, _styledComponents.css)(["outline:none;border:none;"]);
var elevationStyle = exports.elevationStyle = function elevationStyle(elevation) {
  return (0, _styledComponents.css)(["box-shadow:", ";"], function (props) {
    return props.theme.global.elevation[props.theme.dark ? 'dark' : 'light'][elevation];
  });
};

// CSS for this sub-object in the theme
var kindPartStyles = exports.kindPartStyles = function kindPartStyles(obj, theme, colorValue) {
  var styles = [];
  if (obj.padding || obj.pad) {
    // button uses `padding` but other components use Grommet `pad`
    var pad = obj.padding || obj.pad;
    if (pad.vertical || pad.horizontal) styles.push("padding: " + (theme.global.edgeSize[pad.vertical] || pad.vertical || 0) + " " + (theme.global.edgeSize[pad.horizontal] || pad.horizontal || 0) + ";");else styles.push("padding: " + (theme.global.edgeSize[pad] || pad || 0) + ";");
  }
  if (obj.background) styles.push((0, _background.backgroundStyle)(colorValue || obj.background, theme, obj.color || (Object.prototype.hasOwnProperty.call(obj, 'color') && obj.color === undefined ? false : undefined)));else if (obj.color) styles.push("color: " + (0, _colors.normalizeColor)(obj.color, theme) + ";");
  if (obj.border) {
    if (obj.border.width) styles.push((0, _styledComponents.css)(["border-style:solid;border-width:", ";"], obj.border.width));
    if (obj.border.color) styles.push((0, _styledComponents.css)(["border-color:", ";"], (0, _colors.normalizeColor)(!obj.background && colorValue || obj.border.color || 'border', theme)));
    if (obj.border.radius) styles.push((0, _styledComponents.css)(["border-radius:", ";"], obj.border.radius));
  } else if (obj.border === false) styles.push('border: none;');
  if (colorValue && !obj.border && !obj.background) styles.push("color: " + (0, _colors.normalizeColor)(colorValue, theme) + ";");
  if (obj.font) {
    if (obj.font.size) {
      styles.push("font-size: " + (theme.text[obj.font.size].size || obj.font.size) + ";");
    }
    if (obj.font.height) {
      styles.push("line-height: " + obj.font.height + ";");
    }
    if (obj.font.weight) {
      styles.push("font-weight: " + obj.font.weight + ";");
    }
  }
  if (obj.opacity) {
    var opacity = obj.opacity === true ? theme.global.opacity.medium : theme.global.opacity[obj.opacity] || obj.opacity;
    styles.push("opacity: " + opacity + ";");
  }
  if (obj.elevation) {
    styles.push(elevationStyle(obj.elevation));
  }
  if (obj.extend) styles.push(obj.extend);
  return styles;
};
var ROUND_MAP = {
  full: '100%'
};
var roundStyle = exports.roundStyle = function roundStyle(data, responsive, theme) {
  var breakpoint = (0, _responsive.getBreakpointStyle)(theme, theme.box.responsiveBreakpoint);
  // fallback to edgeSize for backwards compatibility
  var radius = theme.global.radius ? 'radius' : 'edgeSize';
  var styles = [];
  if (typeof data === 'object') {
    var _breakpoint$radius;
    var size = ROUND_MAP[data.size] || theme.global[radius][data.size || 'medium'] || data.size;
    var responsiveSize = responsive && breakpoint && ((_breakpoint$radius = breakpoint[radius]) == null ? void 0 : _breakpoint$radius[data.size]) && (breakpoint[radius][data.size] || data.size);
    if (data.corner === 'top') {
      styles.push((0, _styledComponents.css)(["border-top-left-radius:", ";border-top-right-radius:", ";"], size, size));
      if (responsiveSize) {
        styles.push((0, _mixins.breakpointStyle)(breakpoint, "\n          border-top-left-radius: " + responsiveSize + ";\n          border-top-right-radius: " + responsiveSize + ";\n        ", responsive));
      }
    } else if (data.corner === 'bottom') {
      styles.push((0, _styledComponents.css)(["border-bottom-left-radius:", ";border-bottom-right-radius:", ";"], size, size));
      if (responsiveSize) {
        styles.push((0, _mixins.breakpointStyle)(breakpoint, "\n          border-bottom-left-radius: " + responsiveSize + ";\n          border-bottom-right-radius: " + responsiveSize + ";\n        ", responsive));
      }
    } else if (data.corner === 'left') {
      styles.push((0, _styledComponents.css)(["border-top-left-radius:", ";border-bottom-left-radius:", ";"], size, size));
      if (responsiveSize) {
        styles.push((0, _mixins.breakpointStyle)(breakpoint, "\n          border-top-left-radius: " + responsiveSize + ";\n          border-bottom-left-radius: " + responsiveSize + ";\n        ", responsive));
      }
    } else if (data.corner === 'right') {
      styles.push((0, _styledComponents.css)(["border-top-right-radius:", ";border-bottom-right-radius:", ";"], size, size));
      if (responsiveSize) {
        styles.push((0, _mixins.breakpointStyle)(breakpoint, "\n          border-top-right-radius: " + responsiveSize + ";\n          border-bottom-right-radius: " + responsiveSize + ";\n        ", responsive));
      }
    } else if (data.corner) {
      styles.push((0, _styledComponents.css)(["border-", "-radius:", ";"], data.corner, size));
      if (responsiveSize) {
        styles.push((0, _mixins.breakpointStyle)(breakpoint, "\n          border-" + data.corner + "-radius: " + responsiveSize + ";\n        ", responsive));
      }
    } else {
      styles.push((0, _styledComponents.css)(["border-radius:", ";"], size));
      if (responsiveSize) {
        styles.push((0, _mixins.breakpointStyle)(breakpoint, "\n          border-radius: " + responsiveSize + ";\n        ", responsive));
      }
    }
  } else {
    var _theme$global$radius, _breakpoint$radius2;
    var _size2 = data === true ? 'medium' : data;
    styles.push((0, _styledComponents.css)(["border-radius:", ";"], ROUND_MAP[_size2] || ((_theme$global$radius = theme.global[radius]) == null ? void 0 : _theme$global$radius[_size2]) || _size2));
    var _responsiveSize = responsive && breakpoint && ((_breakpoint$radius2 = breakpoint[radius]) == null ? void 0 : _breakpoint$radius2[_size2]);
    if (_responsiveSize) {
      styles.push((0, _mixins.breakpointStyle)(breakpoint, "\n        border-radius: " + _responsiveSize + ";\n      ", responsive));
    }
  }
  return styles;
};
var TEXT_ALIGN_MAP = {
  center: 'center',
  end: 'right',
  justify: 'justify',
  start: 'left'
};
var textAlignStyle = exports.textAlignStyle = (0, _styledComponents.css)(["text-align:", ";"], function (props) {
  return TEXT_ALIGN_MAP[props.textAlign];
});
var ALIGN_ITEMS_MAP = {
  baseline: 'baseline',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch'
};
var alignStyle = exports.alignStyle = (0, _styledComponents.css)(["align-items:", ";"], function (props) {
  var _ALIGN_ITEMS_MAP$prop;
  return (_ALIGN_ITEMS_MAP$prop = ALIGN_ITEMS_MAP[props.align]) != null ? _ALIGN_ITEMS_MAP$prop : props.align;
});
var ALIGN_CONTENT_MAP = {
  around: 'space-around',
  baseline: 'baseline',
  between: 'space-between',
  center: 'center',
  evenly: 'space-evenly',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch'
};
var alignContentStyle = exports.alignContentStyle = (0, _styledComponents.css)(["align-content:", ";"], function (props) {
  var _ALIGN_CONTENT_MAP$pr;
  return (_ALIGN_CONTENT_MAP$pr = ALIGN_CONTENT_MAP[props.alignContent]) != null ? _ALIGN_CONTENT_MAP$pr : props.alignContent;
});
var getSize = function getSize(theme, size) {
  return theme.global.size[size] || size;
};
var widthObjectStyle = function widthObjectStyle(width, theme) {
  var result = [];
  if (width.max) result.push((0, _styledComponents.css)(["max-width:", ";"], getSize(theme, width.max)));
  if (width.min) result.push((0, _styledComponents.css)(["min-width:", ";"], getSize(theme, width.min)));
  if (width.width) result.push((0, _styledComponents.css)(["width:", ";"], getSize(theme, width.width)));
  return result;
};
var widthStringStyle = function widthStringStyle(width, theme) {
  return (0, _styledComponents.css)(["width:", ";"], getSize(theme, width));
};
var widthStyle = exports.widthStyle = function widthStyle(width, theme) {
  return typeof width === 'object' ? widthObjectStyle(width, theme) : widthStringStyle(width, theme);
};
var heightObjectStyle = function heightObjectStyle(height, theme) {
  var result = [];
  if (height.max) result.push((0, _styledComponents.css)(["max-height:", ";"], getSize(theme, height.max)));
  if (height.min) result.push((0, _styledComponents.css)(["min-height:", ";"], getSize(theme, height.min)));
  // backwards compatibile
  if (height.width) result.push((0, _styledComponents.css)(["height:", ";"], getSize(theme, height.height)));
  if (height.height) result.push((0, _styledComponents.css)(["height:", ";"], getSize(theme, height.height)));
  return result;
};
var heightStringStyle = function heightStringStyle(height, theme) {
  return (0, _styledComponents.css)(["height:", ";"], getSize(theme, height));
};
var heightStyle = exports.heightStyle = function heightStyle(height, theme) {
  return typeof height === 'object' ? heightObjectStyle(height, theme) : heightStringStyle(height, theme);
};