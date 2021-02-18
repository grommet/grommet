"use strict";

exports.__esModule = true;
exports.StyledButtonKind = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var radiusStyle = function radiusStyle(props) {
  var size = props.sizeProp; // caller has specified a themeObj to use for styling
  // relevant for cases like pagination which looks to theme.pagination.button

  var themeObj = typeof props.kind === 'object' ? props.kind : props.theme.button;
  if (size && themeObj.size && themeObj.size[size]) return (0, _styledComponents.css)(["border-radius:", ";"], themeObj.size[size].border.radius);
  if (themeObj.border && themeObj.border.radius) return (0, _styledComponents.css)(["border-radius:", ";"], themeObj.border.radius);
  return '';
};

var fontStyle = function fontStyle(props) {
  var size = props.sizeProp || 'medium';
  var data = props.theme.text[size];
  return (0, _styledComponents.css)(["font-size:", ";line-height:", ";"], data.size, data.height);
};

var padFromTheme = function padFromTheme(size, theme, themeObj) {
  if (size === void 0) {
    size = 'medium';
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
  var size = _ref.sizeProp,
      theme = _ref.theme,
      kind = _ref.kind;
  // caller has specified a themeObj to use for styling
  // relevant for cases like pagination which looks to theme.pagination.button
  var themeObj = typeof kind === 'object' ? kind : theme.button;
  var pad = padFromTheme(size, theme, themeObj);
  return pad ? (0, _styledComponents.css)(["padding:", " ", ";"], pad.vertical, pad.horizontal) : '';
}; // The > svg rule is to ensure Buttons with just an icon don't add additional
// vertical height internally.


var basicStyle = function basicStyle(props) {
  return (0, _styledComponents.css)(["border:none;", ";", " ", " > svg{vertical-align:bottom;}"], radiusStyle(props), padStyle(props), fontStyle(props));
};

var getPath = function getPath(theme, path) {
  var obj;

  if (path) {
    obj = theme;
    var parts = path.split('.');

    while (obj && parts.length) {
      obj = obj[parts.shift()];
    }
  }

  return obj;
};

var adjustPadStyle = function adjustPadStyle(pad, width) {
  var offset = (0, _utils.parseMetricToNum)(width);
  return (0, _styledComponents.css)(["padding:", "px ", "px;"], Math.max((0, _utils.parseMetricToNum)(pad.vertical) - offset, 0), Math.max((0, _utils.parseMetricToNum)(pad.horizontal) - offset, 0));
}; // build up CSS from basic to specific based on the supplied sub-object paths


var kindStyle = function kindStyle(_ref2) {
  var colorValue = _ref2.colorValue,
      kind = _ref2.kind,
      size = _ref2.sizeProp,
      themePaths = _ref2.themePaths,
      theme = _ref2.theme;
  var styles = []; // caller has specified a themeObj to use for styling
  // relevant for cases like pagination which looks to theme.pagination.button

  var themeObj = typeof kind === 'object' ? kind : theme.button;
  var pad = padFromTheme(size, theme, themeObj);
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
  }); // do the styling from the root of the object if caller passes one

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

      if (partStyles.length > 0) {
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
  if (hoverIndicator === true || hoverIndicator === 'background') themishObj.background = theme.global.hover.background;else themishObj.background = hoverIndicator;
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
}; // The > svg rule is to ensure Buttons with just an icon don't add additional
// vertical height internally.


var plainStyle = function plainStyle() {
  return (0, _styledComponents.css)(["outline:none;border:none;padding:0;text-align:inherit;color:inherit;> svg{vertical-align:bottom;}"]);
};

var StyledButtonKind = _styledComponents["default"].button.withConfig({
  // don't let kind attribute leak to DOM
  // https://styled-components.com/docs/api#shouldforwardprop
  shouldForwardProp: function shouldForwardProp(prop, defaultValidatorFn) {
    return !['kind'].includes(prop) && defaultValidatorFn(prop);
  }
}).withConfig({
  displayName: "StyledButtonKind",
  componentId: "sc-1vhfpnt-0"
})(["display:inline-block;box-sizing:border-box;cursor:pointer;font:inherit;text-decoration:none;margin:0;background:transparent;overflow:visible;text-transform:none;", " ", " ", " ", " ", " ", " ", " ", " &:focus{", "}", " ", " ", ""], _utils.genericStyles, function (props) {
  return props.plain && plainStyle(props);
}, function (props) {
  return !props.disabled && props.active && _utils.activeStyle;
}, function (props) {
  return !props.plain && basicStyle(props);
}, function (props) {
  return !props.plain && kindStyle(props);
}, function (props) {
  return !props.plain && props.align && "\n    text-align: " + props.align + ";\n    ";
}, function (props) {
  return !props.disabled && props.hoverIndicator && hoverIndicatorStyle(props);
}, function (props) {
  return props.disabled && (0, _utils.disabledStyle)(props.theme.button.disabled.opacity);
}, function (props) {
  return (!props.plain || props.focusIndicator) && (0, _utils.focusStyle)();
}, function (props) {
  return !props.plain && props.theme.button.transition && "\n    transition-property: " + props.theme.button.transition.properties.join(',') + ";\n    transition-duration: " + props.theme.button.transition.duration + "s;\n    transition-timing-function: " + props.theme.button.transition.timing + ";\n  ";
}, function (props) {
  return props.fillContainer && fillStyle(props.fillContainer);
}, function (props) {
  return props.theme.button && props.theme.button.extend;
});

exports.StyledButtonKind = StyledButtonKind;
StyledButtonKind.defaultProps = {};
Object.setPrototypeOf(StyledButtonKind.defaultProps, _defaultProps.defaultProps);