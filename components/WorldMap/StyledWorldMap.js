"use strict";

exports.__esModule = true;
exports.StyledWorldMap = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledWorldMap = _styledComponents.default.svg.withConfig({
  displayName: "StyledWorldMap",
  componentId: "had4c3-0"
})(["width:100%;", " ", ";"], _utils.genericStyles, function (props) {
  return props.theme.worldMap && props.theme.worldMap.extend;
});

exports.StyledWorldMap = StyledWorldMap;
StyledWorldMap.defaultProps = {};
Object.setPrototypeOf(StyledWorldMap.defaultProps, _defaultProps.defaultProps);