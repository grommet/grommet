"use strict";

exports.__esModule = true;
exports.StyledButtonKind = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var radiusStyle = function radiusStyle(props) {
  var size = props.sizeProp;
  if (size && props.theme.button.size && props.theme.button.size[size]) return (0, _styledComponents.css)(["border-radius:", ";"], props.theme.button.size[size].border.radius);
  if (props.theme.button.border && props.theme.button.border.radius) return (0, _styledComponents.css)(["border-radius:", ";"], props.theme.button.border.radius);
  return '';
};

var fontStyle = function fontStyle(props) {
  var size = props.sizeProp || 'medium';
  var data = props.theme.text[size];
  return (0, _styledComponents.css)(["font-size:", ";line-height:", ";"], data.size, data.height);
};

var padStyle = function padStyle(_ref) {
  var size = _ref.sizeProp,
      theme = _ref.theme;

  if (size && theme.button.size && theme.button.size[size] && theme.button.size[size].pad) {
    return (0, _styledComponents.css)(["padding:", " ", ";"], theme.button.size[size].pad.vertical, theme.button.size[size].pad.horizontal);
  }

  if (theme.button.padding) {
    return (0, _styledComponents.css)(["padding:", " ", ";"], theme.global.edgeSize[theme.button.padding.vertical] || theme.button.padding.vertical, theme.global.edgeSize[theme.button.padding.horizontal] || theme.button.padding.horizontal);
  }

  return '';
}; // The > svg rule is to ensure Buttons with just an icon don't add additional
// vertical height internally.


var basicStyle = function basicStyle(props) {
  return (0, _styledComponents.css)(["border:none;", ";", " ", " > svg{vertical-align:bottom;}"], radiusStyle(props), padStyle(props), fontStyle(props));
}; // build up CSS from basic to specific based on the supplied sub-object paths


var kindStyle = function kindStyle(_ref2) {
  var colorValue = _ref2.colorValue,
      themePaths = _ref2.themePaths,
      theme = _ref2.theme;
  var styles = [];
  themePaths.base.forEach(function (themePath) {
    var obj = theme.button;

    if (themePath) {
      var parts = themePath.split('.');

      while (obj && parts.length) {
        obj = obj[parts.shift()];
      }
    }

    if (obj) {
      styles.push((0, _utils.kindPartStyles)(obj, theme, colorValue));
    }
  });
  themePaths.hover.forEach(function (themePath) {
    var obj = theme.button;

    if (themePath) {
      var parts = themePath.split('.');

      while (obj && parts.length) {
        obj = obj[parts.shift()];
      }

      if (obj) {
        var partStyles = (0, _utils.kindPartStyles)(obj, theme);
        if (partStyles.length > 0) styles.push((0, _styledComponents.css)(["&:hover{", "}"], partStyles));
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