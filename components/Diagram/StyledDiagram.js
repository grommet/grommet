"use strict";

exports.__esModule = true;
exports.StyledDiagram = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _defaultProps = require("../../default-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledDiagram = _styledComponents.default.svg.withConfig({
  displayName: "StyledDiagram",
  componentId: "sc-1vzeu9f-0"
})(["max-width:100%;width:100%;height:100%;", ";"], function (props) {
  return props.theme.diagram && props.theme.diagram.extend;
});

exports.StyledDiagram = StyledDiagram;
StyledDiagram.defaultProps = {};
Object.setPrototypeOf(StyledDiagram.defaultProps, _defaultProps.defaultProps);