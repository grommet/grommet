"use strict";

exports.__esModule = true;
exports.StyledButtonKind = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _isPropValid = _interopRequireDefault(require("@emotion/is-prop-valid"));
var _utils = require("../../utils");
var _defaultProps = require("../../default-props");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var radiusStyle = function radiusStyle(props) {
  var size = props.sizeProp;
  // caller has specified a themeObj to use for styling
  // relevant for cases like pagination which looks to theme.pagination.button
  var themeObj = typeof props.kind === 'object' ? props.kind : props.theme.button;
  if (size && themeObj.size && themeObj.size[size]) return (0, _styledComponents.css)(["border-radius:", ";"], themeObj.size[size].border.radius);
  if (themeObj.border && themeObj.border.radius) return (0, _styledComponents.css)(["border-radius:", ";"], themeObj.border.radius);
  return '';
};
var fontStyle = function fontStyle(props) {
  var size = props.sizeProp || 'medium';
  var data = props.theme.text[size];
  return (0, _styledComponents.css)(["font-size:", ";line-height:", ";"], data.size, props.hasIcon && !props.hasLabel ? 0 : data.height);
};
var padFromTheme = function padFromTheme(size, theme, themeObj, kind, iconOnly) {
  var _themeObj$size, _themeObj$size3;
  if (size === void 0) {
    size = 'medium';
  }
  if (size && iconOnly && themeObj != null && (_themeObj$size = themeObj.size) != null && (_themeObj$size = _themeObj$size[size]) != null && (_themeObj$size = _themeObj$size.iconOnly) != null && _themeObj$size.pad) {
    var _themeObj$size2;
    var pad = themeObj == null || (_themeObj$size2 = themeObj.size) == null || (_themeObj$size2 = _themeObj$size2[size]) == null || (_themeObj$size2 = _themeObj$size2.iconOnly) == null ? void 0 : _themeObj$size2.pad;
    return {
      vertical: typeof pad === 'string' ? pad : pad.vertical,
      horizontal: typeof pad === 'string' ? pad : pad.horizontal
    };
  }
  if (size && themeObj != null && (_themeObj$size3 = themeObj.size) != null && (_themeObj$size3 = _themeObj$size3[size]) != null && (_themeObj$size3 = _themeObj$size3[kind]) != null && _themeObj$size3.pad) {
    return themeObj.size[size][kind].pad;
  }
  if (size && themeObj.size && themeObj.size[size] && themeObj.size[size].pad) {
    return {
      vertical: themeObj.size[size].pad.vertical,
      horizontal: themeObj.size[size].pad.horizontal
    };
  }
  if (theme.button.padding) {
    return {
      vertical: theme.global.edgeSize[theme.button.padding.vertical] || theme.button.padding.vertical,
      horizontal: theme.global.edgeSize[theme.button.padding.horizontal] || theme.button.padding.horizontal
    };
  }
  return undefined;
};
var padStyle = function padStyle(_ref) {
  var hasIcon = _ref.hasIcon,
    hasLabel = _ref.hasLabel,
    size = _ref.sizeProp,
    theme = _ref.theme,
    kind = _ref.kind;
  // caller has specified a themeObj to use for styling
  // relevant for cases like pagination which looks to theme.pagination.button
  var themeObj = typeof kind === 'object' ? kind : theme.button;
  var iconOnly = hasIcon && !hasLabel;
  var pad = padFromTheme(size, theme, themeObj, kind, iconOnly);
  return pad ? (0, _styledComponents.css)(["padding:", " ", ";"], pad.vertical, pad.horizontal) : '';
};
var basicStyle = function basicStyle(props) {
  return (0, _styledComponents.css)(["border:none;", ";", " ", " ", ""], radiusStyle(props), padStyle(props), fontStyle(props), props.icon && "\n    > svg {\n      display: flex;\n      align-self: center;\n      vertical-align: middle;\n    }\n  ");
};
var getPath = function getPath(theme, path) {
  var obj;
  if (path) {
    obj = theme;
    var parts = path.split('.');
    while (obj && parts.length) obj = obj[parts.shift()];
  }
  return obj;
};
var adjustPadStyle = function adjustPadStyle(pad, width) {
  var offset = (0, _utils.parseMetricToNum)(width);
  return (0, _styledComponents.css)(["padding:", "px ", "px;"], Math.max((0, _utils.parseMetricToNum)(pad.vertical) - offset, 0), Math.max((0, _utils.parseMetricToNum)(pad.horizontal) - offset, 0));
};

// build up CSS from basic to specific based on the supplied sub-object paths
var kindStyle = function kindStyle(_ref2) {
  var busy = _ref2.busy,
    colorValue = _ref2.colorValue,
    hasIcon = _ref2.hasIcon,
    hasLabel = _ref2.hasLabel,
    kind = _ref2.kind,
    size = _ref2.sizeProp,
    success = _ref2.success,
    themePaths = _ref2.themePaths,
    theme = _ref2.theme;
  var styles = [];

  // caller has specified a themeObj to use for styling
  // relevant for cases like pagination which looks to theme.pagination.button
  var themeObj = typeof kind === 'object' ? kind : theme.button;
  var iconOnly = hasIcon && !hasLabel;
  var pad = padFromTheme(size, theme, themeObj, kind, iconOnly);
  themePaths.base.forEach(function (themePath) {
    var obj = getPath(themeObj, themePath);
    if (obj) {
      styles.push((0, _utils.kindPartStyles)(obj, theme, colorValue));
      if (obj.border && obj.border.width && pad && !obj.padding) {
        // Adjust padding from the button.size or just top button.padding
        // to deal with the kind's border width. But don't override any
        // padding in the kind itself for backward compatibility
        styles.push(adjustPadStyle(pad, obj.border.width));
      }
    }
  });

  // do the styling from the root of the object if caller passes one
  if (!themePaths.base.length && typeof kind === 'object') {
    var obj = kind;
    if (obj) {
      styles.push((0, _utils.kindPartStyles)(obj, theme, colorValue));
      if (obj.border && obj.border.width && pad && !obj.padding) {
        // Adjust padding from the button.size or just top button.padding
        // to deal with the kind's border width. But don't override any
        // padding in the kind itself for backward compatibility
        styles.push(adjustPadStyle(pad, obj.border.width));
      }
    }
  }
  themePaths.hover.forEach(function (themePath) {
    var obj = getPath(themeObj, themePath);
    if (obj) {
      var partStyles = (0, _utils.kindPartStyles)(obj, theme);
      var adjPadStyles = '';
      if (obj.border && obj.border.width && pad && !obj.padding) {
        // Adjust padding from the button.size or just top button.padding
        // to deal with the hover's border width. But don't override any
        // padding in the hover or hover.kind itself for backward compatibility
        adjPadStyles = adjustPadStyle(pad, obj.border.width);
      }
      if (partStyles.length > 0 && !busy && !success) {
        styles.push((0, _styledComponents.css)(["&:hover{", " ", "}"], partStyles, adjPadStyles));
      }
    }
  });
  return styles;
};
var hoverIndicatorStyle = function hoverIndicatorStyle(_ref3) {
  var hoverIndicator = _ref3.hoverIndicator,
    theme = _ref3.theme;
  var themishObj = {};
  if (hoverIndicator === true || hoverIndicator === 'background') themishObj.background = theme.global.hover.background;else if (hoverIndicator.color || hoverIndicator.background) {
    if (hoverIndicator.background) themishObj.background = hoverIndicator.background;
    if (hoverIndicator.color) themishObj.color = hoverIndicator.color;
  } else themishObj.background = hoverIndicator;
  var styles = (0, _utils.kindPartStyles)(themishObj, theme);
  if (styles.length > 0) return (0, _styledComponents.css)(["&:hover{", "}"], styles);
  return '';
};
var fillStyle = function fillStyle(fillContainer) {
  if (fillContainer === 'horizontal') {
    return 'width: 100%;';
  }
  if (fillContainer === 'vertical') {
    return 'height: 100%;';
  }
  if (fillContainer) {
    return "\n      width: 100%;\n      height: 100%;\n      max-width: none;\n      flex: 1 0 auto;\n    ";
  }
  return undefined;
};
var plainStyle = function plainStyle(props) {
  return (0, _styledComponents.css)(["outline:none;border:none;padding:0;text-align:inherit;color:inherit;", " ", ""], props.icon && "\n    > svg {\n      display: flex;\n      align-self: center;\n      vertical-align: middle;\n    }\n  ", props.hasIcon && !props.hasLabel && "line-height: 0;");
};
var StyledButtonKind = exports.StyledButtonKind = _styledComponents["default"].button.withConfig({
  shouldForwardProp: function shouldForwardProp(prop) {
    return (0, _isPropValid["default"])(prop) && !['kind'].includes(prop);
  }
}).withConfig({
  displayName: "StyledButtonKind",
  componentId: "sc-1vhfpnt-0"
})(["display:inline-block;box-sizing:border-box;cursor:pointer;font:inherit;text-decoration:none;margin:0;background:transparent;overflow:visible;text-transform:none;", " ", " ", " ", " ", " ", " ", " ", " ", " &:focus{", "}&:focus:not(:focus-visible){", "}", " ", " ", " ", ""], _utils.genericStyles, function (props) {
  return props.plain && plainStyle(props);
}, function (props) {
  return !props.disabled && props.active && _utils.activeStyle;
}, function (props) {
  return !props.plain && basicStyle(props);
}, function (props) {
  return !props.plain && kindStyle(props);
}, function (props) {
  return !props.plain && props.pad && (0, _utils.edgeStyle)('padding', props.pad, false, undefined, props.theme);
}, function (props) {
  return !props.plain && props.align && "\n    text-align: " + props.align + ";\n    ";
}, function (props) {
  return !props.disabled && props.hoverIndicator && !props.busy && !props.success && hoverIndicatorStyle(props);
}, function (props) {
  return props.disabled && (0, _utils.disabledStyle)(props.theme.button.disabled.opacity);
}, function (props) {
  return (!props.plain || props.focusIndicator) && (0, _utils.focusStyle)();
}, (0, _utils.unfocusStyle)(), function (props) {
  return !props.plain && props.theme.button.transition && "\n    transition-property: " + props.theme.button.transition.properties.join(',') + ";\n    transition-duration: " + props.theme.button.transition.duration + "s;\n    transition-timing-function: " + props.theme.button.transition.timing + ";\n  ";
}, function (props) {
  return props.fillContainer && fillStyle(props.fillContainer);
}, function (props) {
  return props.theme.button && props.theme.button.extend;
}, function (props) {
  return (props.busy || props.success) && "\n    cursor: default;\n  ";
});
StyledButtonKind.defaultProps = {};
Object.setPrototypeOf(StyledButtonKind.defaultProps, _defaultProps.defaultProps);