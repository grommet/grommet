import { css } from 'styled-components';
import { backgroundStyle } from './background';
import { normalizeColor } from './colors';
import { breakpointStyle, parseMetricToNum } from './mixins';
export var baseStyle = css(["font-family:", ";font-size:", ";line-height:", ";font-weight:", ";", " box-sizing:border-box;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;"], function (props) {
  return props.theme.global.font.family;
}, function (props) {
  return props.theme.global.font.size;
}, function (props) {
  return props.theme.global.font.height;
}, function (props) {
  return props.theme.global.font.weight;
}, function (props) {
  return !props.plain && backgroundStyle(props.theme.baseBackground, props.theme);
});
export var controlBorderStyle = css(["border:", " solid ", ";border-radius:", ";"], function (props) {
  return props.theme.global.control.border.width;
}, function (props) {
  return normalizeColor(props.theme.global.control.border.color || 'border', props.theme);
}, function (props) {
  return props.theme.global.control.border.radius;
});
export var edgeStyle = function edgeStyle(kind, data, responsive, responsiveBreakpoint, theme) {
  var breakpoint = responsiveBreakpoint && theme.global.breakpoints[responsiveBreakpoint];

  if (typeof data === 'string') {
    return css(["", ":", ";", ";"], kind, theme.global.edgeSize[data] || data, responsive && breakpoint ? breakpointStyle(breakpoint, "\n        " + kind + ": " + (breakpoint.edgeSize[data] || data) + ";\n      ") : '');
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
    return css(["", ":", ";", ";"], kind, theme.global.edgeSize[value] || value, responsive && breakpoint ? breakpointStyle(breakpoint, "\n        " + kind + ": " + (breakpoint.edgeSize[value] || value) + ";\n      ") : '');
  }

  if (horizontal) {
    result.push(css(["", "-left:", ";", "-right:", ";", ";"], kind, theme.global.edgeSize[horizontal] || horizontal, kind, theme.global.edgeSize[horizontal] || horizontal, responsive && breakpoint ? breakpointStyle(breakpoint, "\n          " + kind + "-left: " + (breakpoint.edgeSize[horizontal] || horizontal) + ";\n          " + kind + "-right: " + (breakpoint.edgeSize[horizontal] || horizontal) + ";\n        ") : ''));
  }

  if (vertical) {
    result.push(css(["", "-top:", ";", "-bottom:", ";", ";"], kind, theme.global.edgeSize[vertical] || vertical, kind, theme.global.edgeSize[vertical] || vertical, responsive && breakpoint ? breakpointStyle(breakpoint, "\n          " + kind + "-top: " + (breakpoint.edgeSize[vertical] || vertical) + ";\n          " + kind + "-bottom: " + (breakpoint.edgeSize[vertical] || vertical) + ";\n        ") : ''));
  }

  if (top) {
    result.push(css(["", "-top:", ";", ";"], kind, theme.global.edgeSize[top] || top, responsive && breakpoint ? breakpointStyle(breakpoint, "\n          " + kind + "-top: " + (breakpoint.edgeSize[top] || top) + ";\n        ") : ''));
  }

  if (bottom) {
    result.push(css(["", "-bottom:", ";", ";"], kind, theme.global.edgeSize[bottom] || bottom, responsive && breakpoint ? breakpointStyle(breakpoint, "\n          " + kind + "-bottom: " + (breakpoint.edgeSize[bottom] || bottom) + ";\n        ") : ''));
  }

  if (left) {
    result.push(css(["", "-left:", ";", ";"], kind, theme.global.edgeSize[left] || left, responsive && breakpoint ? breakpointStyle(breakpoint, "\n          " + kind + "-left: " + (breakpoint.edgeSize[left] || left) + ";\n        ") : ''));
  }

  if (right) {
    result.push(css(["", "-right:", ";", ";"], kind, theme.global.edgeSize[right] || right, responsive && breakpoint ? breakpointStyle(breakpoint, "\n          " + kind + "-right: " + (breakpoint.edgeSize[right] || right) + ";\n        ") : ''));
  }

  if (data.start) {
    result.push(css(["", "-inline-start:", ";", ";"], kind, theme.global.edgeSize[data.start] || data.start, responsive && breakpoint ? breakpointStyle(breakpoint, "\n          " + kind + "-inline-start: " + (breakpoint.edgeSize[data.start] || data.start) + ";\n        ") : ''));
  }

  if (data.end) {
    result.push(css(["", "-inline-end:", ";", ";"], kind, theme.global.edgeSize[data.end] || data.end, responsive && breakpoint ? breakpointStyle(breakpoint, "\n          " + kind + "-inline-end: " + (breakpoint.edgeSize[data.end] || data.end) + ";\n        ") : ''));
  }

  return result;
};
export var fillStyle = function fillStyle(fillProp) {
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

  if (!focus || forceOutline && !focus.outline) {
    var color = normalizeColor('focus', props.theme);
    if (color) return "outline: 2px solid " + color + ";";
    return ''; // native
  }

  if (focus.outline && (!focus.border || !justBorder)) {
    if (typeof focus.outline === 'object') {
      var _color = normalizeColor(focus.outline.color || 'focus', props.theme);

      var size = focus.outline.size || '2px';
      return "\n        outline-offset: 0px;\n        outline: " + size + " solid " + _color + ";\n      ";
    }

    return "outline: " + focus.outline + ";";
  }

  if (focus.shadow && (!focus.border || !justBorder)) {
    if (typeof focus.shadow === 'object') {
      var _color2 = normalizeColor( // If there is a focus.border.color, use that for shadow too.
      // This is for backwards compatibility in v2.
      focus.border && focus.border.color || focus.shadow.color || 'focus', props.theme);

      var _size = focus.shadow.size || '2px'; // backwards compatible default


      return "\n        outline: none;\n        box-shadow: 0 0 " + _size + " " + _size + " " + _color2 + ";\n      ";
    }

    return "\n      outline: none;\n      box-shadow: " + focus.shadow + ";\n    ";
  }

  if (focus.border) {
    var _color3 = normalizeColor(focus.border.color || 'focus', props.theme);

    return "\n      outline: none;\n      border-color: " + _color3 + ";\n    ";
  }

  return ''; // defensive
}; // focus also supports clickable elements inside svg


export var focusStyle = function focusStyle(_temp2) {
  var _ref2 = _temp2 === void 0 ? {} : _temp2,
      forceOutline = _ref2.forceOutline,
      justBorder = _ref2.justBorder,
      skipSvgChildren = _ref2.skipSvgChildren;

  return css(["", " ", " ", ""], function (props) {
    return !skipSvgChildren && "\n  > circle,\n  > ellipse,\n  > line,\n  > path,\n  > polygon,\n  > polyline,\n  > rect {\n    " + focusStyles(props) + "\n  }";
  }, function (props) {
    return focusStyles(props, {
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

var adjustPad = function adjustPad(props, value) {
  return parseMetricToNum((props.theme.global.edgeSize[value] || value) + "px") + parseMetricToNum(props.theme.global.control.border.width + "px") + "px";
};

export var getInputPadBySide = function getInputPadBySide(props, side) {
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
var placeholderColor = css(["color:", ";"], function (props) {
  return normalizeColor(props.theme.global.colors.placeholder, props.theme);
});
var placeholderStyle = css(["&::-webkit-input-placeholder{", ";}&::-moz-placeholder{", ";}&:-ms-input-placeholder{", ";}"], placeholderColor, placeholderColor, placeholderColor);

var inputSizeStyle = function inputSizeStyle(props) {
  var data = props.theme.text[props.size];
  return css(["font-size:", ";line-height:", ";"], data.size, data.height);
};

export var inputStyle = css(["box-sizing:border-box;", " font-family:inherit;border:none;-webkit-appearance:none;background:transparent;color:inherit;width:100%;", " ", " ", " margin:0;", " ", ";", " ", "::-webkit-search-decoration{-webkit-appearance:none;}&::-moz-focus-inner{border:none;outline:none;}&:-moz-placeholder,&::-moz-placeholder{opacity:1;}"], function (props) {
  return "font-size: " + (props.theme.global.input.font.size ? props.theme.text[props.theme.global.input.font.size].size || props.theme.global.input.font.size : 'inherit') + ";";
}, function (props) {
  return props.theme.global.input.font.height && "line-height: " + props.theme.global.input.font.height + ";";
}, function (props) {
  return props.theme.global.input.padding && typeof props.theme.global.input.padding !== 'object' ? // On a breaking change release, this condition could be removed and
  // just the edgeStyle could remain. Currently, this is needed for
  // backwards compatibility since we are placing the calculation in
  // base.js
  "padding: " + (parseMetricToNum(props.theme.global.edgeSize[props.theme.global.input.padding] || props.theme.global.input.padding) - parseMetricToNum(props.theme.global.control.border.width)) + "px;" : edgeStyle('padding', props.theme.global.input.padding, props.responsive, props.theme.box.responsiveBreakpoint, props.theme);
}, function (props) {
  return (// for backwards compatibility, check if props.theme.global.input.weight
    (props.theme.global.input.weight || props.theme.global.input.font.weight) && css(["font-weight:", ";"], props.theme.global.input.weight || props.theme.global.input.font.weight)
  );
}, function (props) {
  return props.size && inputSizeStyle(props);
}, function (props) {
  return props.focus && !props.plain && focusStyle();
}, controlBorderStyle, placeholderStyle);
export var overflowStyle = function overflowStyle(overflowProp) {
  if (typeof overflowProp === 'string') {
    return css(["overflow:", ";"], overflowProp);
  }

  return css(["", " ", ";"], overflowProp.horizontal && "overflow-x: " + overflowProp.horizontal + ";", overflowProp.vertical && "overflow-y: " + overflowProp.vertical + ";");
};
var ALIGN_SELF_MAP = {
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch'
};
export var genericStyles = css(["", " ", " ", ""], function (props) {
  return props.alignSelf && "align-self: " + ALIGN_SELF_MAP[props.alignSelf] + ";";
}, function (props) {
  return props.gridArea && "grid-area: " + props.gridArea + ";";
}, function (props) {
  return props.margin && props.theme.global && edgeStyle('margin', props.margin, props.responsive, props.theme.global.edgeSize.responsiveBreakpoint, props.theme);
});
export var disabledStyle = function disabledStyle(componentStyle) {
  return css(["opacity:", ";cursor:default;"], function (props) {
    return componentStyle || props.theme.global.control.disabled.opacity;
  });
};
export var sizeStyle = function sizeStyle(name, value, theme) {
  return css(["", ":", ";"], name, theme.global.size[value] || value);
};
export var plainInputStyle = css(["outline:none;border:none;"]);