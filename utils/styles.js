"use strict";

exports.__esModule = true;
exports.heightStyle = exports.widthStyle = exports.alignContentStyle = exports.alignStyle = exports.textAlignStyle = exports.roundStyle = exports.kindPartStyles = exports.plainInputStyle = exports.sizeStyle = exports.disabledStyle = exports.genericStyles = exports.overflowStyle = exports.inputStyle = exports.getInputPadBySide = exports.unfocusStyle = exports.focusStyle = exports.fillStyle = exports.edgeStyle = exports.controlBorderStyle = exports.baseStyle = void 0;

var _styledComponents = require("styled-components");

var _background = require("./background");

var _colors = require("./colors");

var _responsive = require("./responsive");

var _mixins = require("./mixins");

var baseStyle = (0, _styledComponents.css)(["font-family:", ";font-size:", ";line-height:", ";font-weight:", ";", " box-sizing:border-box;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;"], function (props) {
  return props.theme.global.font.family;
}, function (props) {
  return props.theme.global.font.size;
}, function (props) {
  return props.theme.global.font.height;
}, function (props) {
  return props.theme.global.font.weight;
}, function (props) {
  return !props.plain && (0, _background.backgroundStyle)(props.theme.baseBackground, props.theme);
});
exports.baseStyle = baseStyle;
var controlBorderStyle = (0, _styledComponents.css)(["border:", " solid ", ";border-radius:", ";"], function (props) {
  return props.theme.global.control.border.width;
}, function (props) {
  return (0, _colors.normalizeColor)(props.theme.global.control.border.color || 'border', props.theme);
}, function (props) {
  return props.theme.global.control.border.radius;
});
exports.controlBorderStyle = controlBorderStyle;

var edgeStyle = function edgeStyle(kind, data, responsive, responsiveBreakpoint, theme) {
  var breakpoint = responsiveBreakpoint && theme.global.breakpoints[responsiveBreakpoint];

  if (typeof data === 'string') {
    return (0, _styledComponents.css)(["", ":", ";", ";"], kind, theme.global.edgeSize[data] || data, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n        " + kind + ": " + (breakpoint.edgeSize[data] || data) + ";\n      ") : '');
  }

  var result = [];
  var horizontal = data.horizontal,
      vertical = data.vertical,
      top = data.top,
      bottom = data.bottom,
      left = data.left,
      right = data.right; // if horizontal and vertical are equal OR all sides are equal,
  // we can just return a single css value such as padding: 12px
  // instead of breaking out by sides.

  var horizontalVerticalEqual = horizontal && vertical && horizontal === vertical;
  var allSidesEqual = top && bottom && left && right && top === bottom === left === right;

  if (horizontalVerticalEqual || allSidesEqual) {
    // since the values will be the same between vertical & horizontal OR
    // left, right, top, & bottom, we can just choose one
    var value = horizontalVerticalEqual ? horizontal : top;
    return (0, _styledComponents.css)(["", ":", ";", ";"], kind, theme.global.edgeSize[value] || value, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n        " + kind + ": " + (breakpoint.edgeSize[value] || value) + ";\n      ") : '');
  }

  if (horizontal) {
    result.push((0, _styledComponents.css)(["", "-left:", ";", "-right:", ";", ";"], kind, theme.global.edgeSize[horizontal] || horizontal, kind, theme.global.edgeSize[horizontal] || horizontal, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n          " + kind + "-left: " + (breakpoint.edgeSize[horizontal] || horizontal) + ";\n          " + kind + "-right: " + (breakpoint.edgeSize[horizontal] || horizontal) + ";\n        ") : ''));
  }

  if (vertical) {
    result.push((0, _styledComponents.css)(["", "-top:", ";", "-bottom:", ";", ";"], kind, theme.global.edgeSize[vertical] || vertical, kind, theme.global.edgeSize[vertical] || vertical, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n          " + kind + "-top: " + (breakpoint.edgeSize[vertical] || vertical) + ";\n          " + kind + "-bottom: " + (breakpoint.edgeSize[vertical] || vertical) + ";\n        ") : ''));
  }

  if (top) {
    result.push((0, _styledComponents.css)(["", "-top:", ";", ";"], kind, theme.global.edgeSize[top] || top, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n          " + kind + "-top: " + (breakpoint.edgeSize[top] || top) + ";\n        ") : ''));
  }

  if (bottom) {
    result.push((0, _styledComponents.css)(["", "-bottom:", ";", ";"], kind, theme.global.edgeSize[bottom] || bottom, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n          " + kind + "-bottom: " + (breakpoint.edgeSize[bottom] || bottom) + ";\n        ") : ''));
  }

  if (left) {
    result.push((0, _styledComponents.css)(["", "-left:", ";", ";"], kind, theme.global.edgeSize[left] || left, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n          " + kind + "-left: " + (breakpoint.edgeSize[left] || left) + ";\n        ") : ''));
  }

  if (right) {
    result.push((0, _styledComponents.css)(["", "-right:", ";", ";"], kind, theme.global.edgeSize[right] || right, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n          " + kind + "-right: " + (breakpoint.edgeSize[right] || right) + ";\n        ") : ''));
  }

  if (data.start) {
    result.push((0, _styledComponents.css)(["", "-inline-start:", ";", ";"], kind, theme.global.edgeSize[data.start] || data.start, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n          " + kind + "-inline-start: " + (breakpoint.edgeSize[data.start] || data.start) + ";\n        ") : ''));
  }

  if (data.end) {
    result.push((0, _styledComponents.css)(["", "-inline-end:", ";", ";"], kind, theme.global.edgeSize[data.end] || data.end, responsive && breakpoint ? (0, _mixins.breakpointStyle)(breakpoint, "\n          " + kind + "-inline-end: " + (breakpoint.edgeSize[data.end] || data.end) + ";\n        ") : ''));
  }

  return result;
};

exports.edgeStyle = edgeStyle;

var fillStyle = function fillStyle(fillProp) {
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

exports.fillStyle = fillStyle;

var focusStyles = function focusStyles(props, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      forceOutline = _ref.forceOutline,
      justBorder = _ref.justBorder;

  var focus = props.theme.global.focus;

  if (!focus || forceOutline && !focus.outline) {
    var color = (0, _colors.normalizeColor)('focus', props.theme);
    if (color) return "outline: 2px solid " + color + ";";
    return ''; // native
  }

  if (focus.outline && (!focus.border || !justBorder)) {
    if (typeof focus.outline === 'object') {
      var _color = (0, _colors.normalizeColor)(focus.outline.color || 'focus', props.theme);

      var size = focus.outline.size || '2px';
      return "\n        outline-offset: 0px;\n        outline: " + size + " solid " + _color + ";\n      ";
    }

    return "outline: " + focus.outline + ";";
  }

  if (focus.shadow && (!focus.border || !justBorder)) {
    if (typeof focus.shadow === 'object') {
      var _color2 = (0, _colors.normalizeColor)( // If there is a focus.border.color, use that for shadow too.
      // This is for backwards compatibility in v2.
      focus.border && focus.border.color || focus.shadow.color || 'focus', props.theme);

      var _size = focus.shadow.size || '2px'; // backwards compatible default


      return "\n        outline: none;\n        box-shadow: 0 0 " + _size + " " + _size + " " + _color2 + ";\n      ";
    }

    return "\n      outline: none;\n      box-shadow: " + focus.shadow + ";\n    ";
  }

  if (focus.border) {
    var _color3 = (0, _colors.normalizeColor)(focus.border.color || 'focus', props.theme);

    return "\n      outline: none;\n      border-color: " + _color3 + ";\n    ";
  }

  return ''; // defensive
};

var unfocusStyles = function unfocusStyles(props, _temp2) {
  var _ref2 = _temp2 === void 0 ? {} : _temp2,
      forceOutline = _ref2.forceOutline,
      justBorder = _ref2.justBorder;

  var focus = props.theme.global.focus;

  if (!focus || forceOutline && !focus.outline) {
    var color = (0, _colors.normalizeColor)('focus', props.theme);
    if (color) return "outline: none;";
    return ''; // native
  }

  if (focus.outline && (!focus.border || !justBorder)) {
    if (typeof focus.outline === 'object') {
      return "\n        outline-offset: 0px;\n        outline: none;\n      ";
    }

    return "outline: none;";
  }

  if (focus.shadow && (!focus.border || !justBorder)) {
    if (typeof focus.shadow === 'object') {
      return "\n        outline: none;\n        box-shadow: none;\n      ";
    }

    return "\n      outline: none;\n      box-shadow: none;\n    ";
  }

  if (focus.border) {
    return "\n      outline: none;\n      border-color: none;\n    ";
  }

  return ''; // defensive
}; // focus also supports clickable elements inside svg


var focusStyle = function focusStyle(_temp3) {
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
}; // This is placed next to focusStyle for easy maintainability
// of code since changes to focusStyle should be reflected in
// unfocusStyle as well.
// this function can be used to reset focus styles which is
// applicable when turning the focus ring off when using the mouse
// see https://nelo.is/writing/styling-better-focus-states/


exports.focusStyle = focusStyle;

var unfocusStyle = function unfocusStyle(_temp4) {
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
}; // For backwards compatibility we need to add back the control border width.
// Based on how grommet was functioning prior to https://github.com/grommet/grommet/pull/3939,
// the padding was subtracting the border width from the theme value, but the
// placeholder was not. Because we're now placing the subtraction into the
// theme itself, we have to add back in the border width here.
// This is used for placeholder/icon in TextInput and MaskedInput.


exports.unfocusStyle = unfocusStyle;

var adjustPad = function adjustPad(props, value) {
  return (0, _mixins.parseMetricToNum)((props.theme.global.edgeSize[value] || value) + "px") + (0, _mixins.parseMetricToNum)(props.theme.global.control.border.width + "px") + "px";
};

var getInputPadBySide = function getInputPadBySide(props, side) {
  if (typeof props.theme.global.input.padding !== 'object') {
    var _adjustedPad = adjustPad(props, props.theme.global.input.padding);

    return _adjustedPad;
  }

  var orientation;
  if (side === 'left' || side === 'right') orientation = 'horizontal';else if (side === 'top' || side === 'bottom') orientation = 'vertical';else orientation = undefined; // if individual side isn't available, fallback to the
  // orientation if possible

  var pad = props.theme.global.input.padding[side] || props.theme.global.input.padding[orientation];
  var adjustedPad = adjustPad(props, pad);
  return adjustedPad;
};

exports.getInputPadBySide = getInputPadBySide;
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

var inputStyle = (0, _styledComponents.css)(["box-sizing:border-box;", " font-family:inherit;border:none;-webkit-appearance:none;background:transparent;color:inherit;width:100%;", " ", " ", " margin:0;", " &:focus{", ";}", " ", "::-webkit-search-decoration{-webkit-appearance:none;}&::-moz-focus-inner{border:none;outline:none;}&:-moz-placeholder,&::-moz-placeholder{opacity:1;}", ""], function (props) {
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
  return (// for backwards compatibility, check if props.theme.global.input.weight
    (props.theme.global.input.weight || props.theme.global.input.font.weight) && (0, _styledComponents.css)(["font-weight:", ";"], props.theme.global.input.weight || props.theme.global.input.font.weight)
  );
}, function (props) {
  return props.size && inputSizeStyle(props);
}, function (props) {
  return (!props.plain || props.focusIndicator) && focusStyle();
}, controlBorderStyle, placeholderStyle, function (props) {
  return props.theme.global.input.extend;
});
exports.inputStyle = inputStyle;

var overflowStyle = function overflowStyle(overflowProp) {
  if (typeof overflowProp === 'string') {
    return (0, _styledComponents.css)(["overflow:", ";"], overflowProp);
  }

  return (0, _styledComponents.css)(["", " ", ";"], overflowProp.horizontal && "overflow-x: " + overflowProp.horizontal + ";", overflowProp.vertical && "overflow-y: " + overflowProp.vertical + ";");
};

exports.overflowStyle = overflowStyle;
var ALIGN_SELF_MAP = {
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch'
};
var genericStyles = (0, _styledComponents.css)(["", " ", " ", ""], function (props) {
  return props.alignSelf && "align-self: " + ALIGN_SELF_MAP[props.alignSelf] + ";";
}, function (props) {
  return props.gridArea && "grid-area: " + props.gridArea + ";";
}, function (props) {
  return props.margin && props.theme.global && edgeStyle('margin', props.margin, props.responsive, props.theme.global.edgeSize.responsiveBreakpoint, props.theme);
});
exports.genericStyles = genericStyles;

var disabledStyle = function disabledStyle(componentStyle) {
  return (0, _styledComponents.css)(["opacity:", ";cursor:default;"], function (props) {
    return componentStyle || props.theme.global.control.disabled.opacity;
  });
};

exports.disabledStyle = disabledStyle;

var sizeStyle = function sizeStyle(name, value, theme) {
  return (0, _styledComponents.css)(["", ":", ";"], name, theme.global.size[value] || value);
};

exports.sizeStyle = sizeStyle;
var plainInputStyle = (0, _styledComponents.css)(["outline:none;border:none;"]); // CSS for this sub-object in the theme

exports.plainInputStyle = plainInputStyle;

var kindPartStyles = function kindPartStyles(obj, theme, colorValue) {
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

  if (obj.extend) styles.push(obj.extend);
  return styles;
};

exports.kindPartStyles = kindPartStyles;
var ROUND_MAP = {
  full: '100%'
};

var roundStyle = function roundStyle(data, responsive, theme) {
  var breakpoint = (0, _responsive.getBreakpointStyle)(theme, theme.box.responsiveBreakpoint);
  var styles = [];

  if (typeof data === 'object') {
    var size = ROUND_MAP[data.size] || theme.global.edgeSize[data.size || 'medium'] || data.size;
    var responsiveSize = responsive && breakpoint && breakpoint.edgeSize[data.size] && (breakpoint.edgeSize[data.size] || data.size);

    if (data.corner === 'top') {
      styles.push((0, _styledComponents.css)(["border-top-left-radius:", ";border-top-right-radius:", ";"], size, size));

      if (responsiveSize) {
        styles.push((0, _mixins.breakpointStyle)(breakpoint, "\n          border-top-left-radius: " + responsiveSize + ";\n          border-top-right-radius: " + responsiveSize + ";\n        "));
      }
    } else if (data.corner === 'bottom') {
      styles.push((0, _styledComponents.css)(["border-bottom-left-radius:", ";border-bottom-right-radius:", ";"], size, size));

      if (responsiveSize) {
        styles.push((0, _mixins.breakpointStyle)(breakpoint, "\n          border-bottom-left-radius: " + responsiveSize + ";\n          border-bottom-right-radius: " + responsiveSize + ";\n        "));
      }
    } else if (data.corner === 'left') {
      styles.push((0, _styledComponents.css)(["border-top-left-radius:", ";border-bottom-left-radius:", ";"], size, size));

      if (responsiveSize) {
        styles.push((0, _mixins.breakpointStyle)(breakpoint, "\n          border-top-left-radius: " + responsiveSize + ";\n          border-bottom-left-radius: " + responsiveSize + ";\n        "));
      }
    } else if (data.corner === 'right') {
      styles.push((0, _styledComponents.css)(["border-top-right-radius:", ";border-bottom-right-radius:", ";"], size, size));

      if (responsiveSize) {
        styles.push((0, _mixins.breakpointStyle)(breakpoint, "\n          border-top-right-radius: " + responsiveSize + ";\n          border-bottom-right-radius: " + responsiveSize + ";\n        "));
      }
    } else if (data.corner) {
      styles.push((0, _styledComponents.css)(["border-", "-radius:", ";"], data.corner, size));

      if (responsiveSize) {
        styles.push((0, _mixins.breakpointStyle)(breakpoint, "\n          border-" + data.corner + "-radius: " + responsiveSize + ";\n        "));
      }
    } else {
      styles.push((0, _styledComponents.css)(["border-radius:", ";"], size));

      if (responsiveSize) {
        styles.push((0, _mixins.breakpointStyle)(breakpoint, "\n          border-radius: " + responsiveSize + ";\n        "));
      }
    }
  } else {
    var _size2 = data === true ? 'medium' : data;

    styles.push((0, _styledComponents.css)(["border-radius:", ";"], ROUND_MAP[_size2] || theme.global.edgeSize[_size2] || _size2));

    var _responsiveSize = breakpoint && breakpoint.edgeSize[_size2];

    if (_responsiveSize) {
      styles.push((0, _mixins.breakpointStyle)(breakpoint, "\n        border-radius: " + _responsiveSize + ";\n      "));
    }
  }

  return styles;
};

exports.roundStyle = roundStyle;
var TEXT_ALIGN_MAP = {
  center: 'center',
  end: 'right',
  justify: 'justify',
  start: 'left'
};
var textAlignStyle = (0, _styledComponents.css)(["text-align:", ";"], function (props) {
  return TEXT_ALIGN_MAP[props.textAlign];
});
exports.textAlignStyle = textAlignStyle;
var ALIGN_ITEMS_MAP = {
  baseline: 'baseline',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch'
};
var alignStyle = (0, _styledComponents.css)(["align-items:", ";"], function (props) {
  var _ALIGN_ITEMS_MAP$prop;

  return (_ALIGN_ITEMS_MAP$prop = ALIGN_ITEMS_MAP[props.align]) != null ? _ALIGN_ITEMS_MAP$prop : props.align;
});
exports.alignStyle = alignStyle;
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
var alignContentStyle = (0, _styledComponents.css)(["align-content:", ";"], function (props) {
  var _ALIGN_CONTENT_MAP$pr;

  return (_ALIGN_CONTENT_MAP$pr = ALIGN_CONTENT_MAP[props.alignContent]) != null ? _ALIGN_CONTENT_MAP$pr : props.alignContent;
});
exports.alignContentStyle = alignContentStyle;

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

var widthStyle = function widthStyle(width, theme) {
  return typeof width === 'object' ? widthObjectStyle(width, theme) : widthStringStyle(width, theme);
};

exports.widthStyle = widthStyle;

var heightObjectStyle = function heightObjectStyle(height, theme) {
  var result = [];
  if (height.max) result.push((0, _styledComponents.css)(["max-height:", ";"], getSize(theme, height.max)));
  if (height.min) result.push((0, _styledComponents.css)(["min-height:", ";"], getSize(theme, height.min)));
  if (height.width) result.push((0, _styledComponents.css)(["height:", ";"], getSize(theme, height.height)));
  return result;
};

var heightStringStyle = function heightStringStyle(height, theme) {
  return (0, _styledComponents.css)(["height:", ";"], getSize(theme, height));
};

var heightStyle = function heightStyle(height, theme) {
  return typeof height === 'object' ? heightObjectStyle(height, theme) : heightStringStyle(height, theme);
};

exports.heightStyle = heightStyle;