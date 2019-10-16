"use strict";

exports.__esModule = true;
exports.StyledWorldMap = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fillStyle = function fillStyle(fillProp) {
  if (fillProp === 'horizontal') {
    return "\n      width: 100%;\n      height: unset;\n    ";
  }

  if (fillProp === 'vertical') {
    return "\n      width: unset;\n      height: 100%;\n    ";
  }

  if (fillProp) {
    return "\n      width: 100%;\n      height: 100%;\n    ";
  }

  return '';
}; // undefined fillProp has width for backwards compatibility


var StyledWorldMap = _styledComponents["default"].svg.withConfig({
  displayName: "StyledWorldMap",
  componentId: "had4c3-0"
})(["", " ", " ", ";"], _utils.genericStyles, function (props) {
  return props.fillProp !== undefined ? fillStyle(props.fillProp) : 'width: 100%;';
}, function (props) {
  return props.theme.worldMap && props.theme.worldMap.extend;
});

exports.StyledWorldMap = StyledWorldMap;
StyledWorldMap.defaultProps = {};
Object.setPrototypeOf(StyledWorldMap.defaultProps, _defaultProps.defaultProps);