"use strict";

exports.__esModule = true;
exports.StyledDiagram = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _defaultProps = require("../../default-props");
var _animation = require("../../utils/animation");
var _styles = require("../../utils/styles");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var animationItemStyle = function animationItemStyle(animationType, theme) {
  if (typeof animationType === 'string') {
    return (0, _animation.animationObjectStyle)({
      type: animationType
    }, theme, theme.diagram);
  }
  if (typeof animationType === 'object') {
    return (0, _animation.animationObjectStyle)(animationType, theme, theme.diagram);
  }
  if (typeof animationType === 'boolean') {
    return (0, _animation.animationObjectStyle)({
      type: 'draw'
    }, theme, theme.diagram);
  }
  return '';
};
var animationStyle = function animationStyle(props) {
  var animationCopy = props.animation;
  if (typeof props.animation === 'object') {
    animationCopy.type = animationCopy.type || 'draw';
  }
  var animationType = animationCopy.type || animationCopy;
  if (animationType === 'draw' || animationType === true) {
    return (0, _styledComponents.css)(["path{stroke-dasharray:500;stroke-dashoffset:500;animation:", ";}"], animationItemStyle(animationCopy, props.theme));
  }
  return (0, _styledComponents.css)(["animation:", ";"], animationItemStyle(animationCopy, props.theme));
};
var connectionStyle = function connectionStyle(connection, index, theme) {
  var type = connection.props.animation.type;
  if (typeof connection.props.animation === 'object') {
    type = type || 'draw';
  }
  var animationType = type || connection.props.animation;
  return (0, _styledComponents.css)(["path:nth-child(", "){stroke-dasharray:", ";stroke-dashoffset:", ";animation:", ";}"], index + 1, animationType === 'draw' || animationType === true ? 500 : 0, animationType === 'draw' || animationType === true ? 500 : 0, animationItemStyle(connection.props.animation, theme));
};
var availableAnimations = [true, 'draw', 'pulse'];
var StyledDiagram = exports.StyledDiagram = _styledComponents["default"].svg.withConfig(_styles.styledComponentsConfig).withConfig({
  displayName: "StyledDiagram",
  componentId: "sc-1vzeu9f-0"
})(["max-width:100%;width:100%;height:100%;", " ", " ", ""], function (props) {
  return props.connections && props.connections.map(function (connection, index) {
    if (connection !== undefined && connection.props.animation) {
      var animation = connection.props.animation;
      // setting type to 'draw' if user doesn't specify a type
      if (typeof animation === 'object') {
        // copying 'connection' to avoid linter error
        var connectionCopy = connection;
        connectionCopy.props.animation.type = animation.type || 'draw';
        return availableAnimations.includes(animation.type || animation) ? connectionStyle(connectionCopy, index, props.theme) : '';
      }
      return connectionStyle(connection, index, props.theme);
    }
    return '';
  });
}, function (props) {
  return props.animation && (availableAnimations.includes(props.animation.type || props.animation) || Object.keys(props.animation).length !== 0) ? animationStyle(props) : '';
}, function (props) {
  return props.theme.diagram && props.theme.diagram.extend;
});
StyledDiagram.defaultProps = {};
Object.setPrototypeOf(StyledDiagram.defaultProps, _defaultProps.defaultProps);