"use strict";

exports.__esModule = true;
exports.StyledDiagram = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _animation = require("../../utils/animation");
var _styles = require("../../utils/styles");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

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