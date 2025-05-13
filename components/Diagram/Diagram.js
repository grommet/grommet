"use strict";

exports.__esModule = true;
exports.Diagram = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
var _StyledDiagram = require("./StyledDiagram");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["connections"],
  _excluded2 = ["anchor", "animation", "color", "offset", "round", "thickness", "type"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var computeMidPoint = function computeMidPoint(fromPoint, toPoint) {
  return [fromPoint[0] > toPoint[0] ? toPoint[0] + (fromPoint[0] - toPoint[0]) / 2 : fromPoint[0] + (toPoint[0] - fromPoint[0]) / 2, fromPoint[1] > toPoint[1] ? toPoint[1] + (fromPoint[1] - toPoint[1]) / 2 : fromPoint[1] + (toPoint[1] - fromPoint[1]) / 2];
};
var COMMANDS = {
  curved: function curved(fromPoint, toPoint, offset, anchor) {
    var midPoint = computeMidPoint(fromPoint, toPoint);
    var cmds = "M " + (fromPoint[0] + offset) + "," + (fromPoint[1] + offset) + " ";
    if (anchor === 'horizontal') {
      cmds += "Q " + (midPoint[0] + offset) + "," + (fromPoint[1] + offset) + " " + (midPoint[0] + offset + "," + (midPoint[1] + offset) + " ");
    } else {
      cmds += "Q " + (fromPoint[0] + offset) + "," + (midPoint[1] + offset) + " " + (midPoint[0] + offset + "," + (midPoint[1] + offset) + " ");
    }
    cmds += "T " + (toPoint[0] + offset) + "," + (toPoint[1] + offset);
    return cmds;
  },
  direct: function direct(fromPoint, toPoint, offset) {
    return "M " + (fromPoint[0] + offset) + "," + (fromPoint[1] + offset) + " " + ("L " + (toPoint[0] + offset) + "," + (toPoint[1] + offset));
  },
  rectilinear: function rectilinear(fromPoint, toPoint, offset, anchor) {
    var midPoint = computeMidPoint(fromPoint, toPoint);
    var cmds = "M " + (fromPoint[0] + offset) + "," + (fromPoint[1] + offset) + " ";
    if (anchor === 'horizontal') {
      cmds += "L " + (midPoint[0] + offset) + "," + (fromPoint[1] + offset) + " " + ("L " + (midPoint[0] + offset) + "," + (toPoint[1] + offset) + " ");
    } else {
      cmds += "L " + (fromPoint[0] + offset) + "," + (midPoint[1] + offset) + " " + ("L " + (toPoint[0] + offset) + "," + (midPoint[1] + offset) + " ");
    }
    cmds += "L " + (toPoint[0] + offset) + "," + (toPoint[1] + offset);
    return cmds;
  }
};
var findTarget = function findTarget(target) {
  if (typeof target === 'string') {
    return document.getElementById(target);
  }
  return target;
};
var defaultConnections = [];
var Diagram = exports.Diagram = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _ref$connections = _ref.connections,
    connections = _ref$connections === void 0 ? defaultConnections : _ref$connections,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useState = (0, _react.useState)({
      width: 0,
      height: 0
    }),
    dimensions = _useState[0],
    setDimensions = _useState[1];
  var _useState2 = (0, _react.useState)(),
    connectionPoints = _useState2[0],
    setConnectionPoints = _useState2[1];
  var svgRef = (0, _utils.useForwardedRef)(ref);
  (0, _react.useEffect)(function () {
    setConnectionPoints(undefined);
  }, [connections]);
  var onResize = (0, _react.useCallback)(function () {
    var svg = svgRef.current;
    if (svg) {
      var rect = svg.getBoundingClientRect();
      if (rect.width !== dimensions.width || rect.height !== dimensions.height) {
        setDimensions({
          width: rect.width,
          height: rect.height
        });
        setConnectionPoints(undefined);
      }
    }
  }, [dimensions.width, dimensions.height, svgRef]);

  // Ref that stores resize handler
  var savedOnResize = (0, _react.useRef)();

  // Update resize ref value if onResize changes.
  // This allows our effect below to always get latest handler
  (0, _react.useEffect)(function () {
    savedOnResize.current = onResize;
  }, [onResize]);
  (0, _react.useEffect)(function () {
    var onResizeHandler = function onResizeHandler(event) {
      return savedOnResize.current(event);
    };
    onResizeHandler();
    window.addEventListener('resize', onResizeHandler);
    return function () {
      window.removeEventListener('resize', onResizeHandler);
    };
  }, []);
  var placeConnections = (0, _react.useCallback)(function () {
    var containerRect = svgRef.current.getBoundingClientRect();
    var updatedConnectionPoints = connections.map(function (_ref2) {
      var anchor = _ref2.anchor,
        fromTarget = _ref2.fromTarget,
        toTarget = _ref2.toTarget;
      var points;
      var fromElement = findTarget(fromTarget);
      var toElement = findTarget(toTarget);
      if (!fromElement) {
        console.warn("Diagram cannot find " + fromTarget);
      }
      if (!toElement) {
        console.warn("Diagram cannot find " + toTarget);
      }
      if (fromElement && toElement) {
        var fromRect = fromElement.getBoundingClientRect();
        var toRect = toElement.getBoundingClientRect();
        // There is no x and y when unit testing.
        var fromPoint = [fromRect.left - containerRect.left || 0, fromRect.top - containerRect.top || 0];
        var toPoint = [toRect.left - containerRect.left || 0, toRect.top - containerRect.top || 0];
        if (anchor === 'vertical') {
          fromPoint[0] += fromRect.width / 2;
          toPoint[0] += toRect.width / 2;
          if (fromRect.top < toRect.top) {
            fromPoint[1] += fromRect.height;
          } else {
            toPoint[1] += toRect.height;
          }
        } else if (anchor === 'horizontal') {
          fromPoint[1] += fromRect.height / 2;
          toPoint[1] += toRect.height / 2;
          if (fromRect.left < toRect.left) {
            fromPoint[0] += fromRect.width;
          } else {
            toPoint[0] += toRect.width;
          }
        } else {
          // center
          fromPoint[0] += fromRect.width / 2;
          fromPoint[1] += fromRect.height / 2;
          toPoint[0] += toRect.width / 2;
          toPoint[1] += toRect.height / 2;
        }
        points = [fromPoint, toPoint];
      }
      return points;
    });
    setConnectionPoints(updatedConnectionPoints);
  }, [connections, svgRef]);
  (0, _react.useEffect)(function () {
    if (!connectionPoints) {
      placeConnections();
    }
  }, [connectionPoints, placeConnections]);
  var paths;
  if (connectionPoints) {
    paths = connections.map(function (_ref3, index) {
      var anchor = _ref3.anchor,
        animation = _ref3.animation,
        color = _ref3.color,
        offset = _ref3.offset,
        round = _ref3.round,
        thickness = _ref3.thickness,
        type = _ref3.type,
        connectionRest = _objectWithoutPropertiesLoose(_ref3, _excluded2);
      var path;
      var cleanedRest = _extends({}, connectionRest);
      delete cleanedRest.fromTarget;
      delete cleanedRest.toTarget;
      var points = connectionPoints[index];
      if (points) {
        var offsetWidth = offset ? (0, _utils.parseMetricToNum)(theme.global.edgeSize[offset]) : 0;
        var d = COMMANDS[type || 'curved'](points[0], points[1], offsetWidth, anchor);
        var strokeWidth = thickness ? (0, _utils.parseMetricToNum)(theme.global.edgeSize[thickness] || thickness) : 1;
        var colorName = color || theme.diagram.line && theme.diagram.line.color;
        if (!colorName) {
          var colors = Object.keys(theme.global.colors).filter(function (n) {
            return n.match(/^graph-[0-9]$/);
          });
          colorName = colors[index % colors.length];
        }
        path = /*#__PURE__*/_react["default"].createElement("path", _extends({
          // eslint-disable-next-line react/no-array-index-key
          key: index
          // eslint-disable-next-line react/no-unknown-property
          ,
          animation: animation
        }, cleanedRest, {
          stroke: (0, _utils.normalizeColor)(colorName, theme),
          strokeWidth: strokeWidth,
          strokeLinecap: round ? 'round' : 'butt',
          strokeLinejoin: round ? 'round' : 'miter',
          fill: "none",
          d: d
        }));
      }
      return path;
    });
  }
  return /*#__PURE__*/_react["default"].createElement(_StyledDiagram.StyledDiagram, _extends({
    ref: svgRef,
    viewBox: "0 0 " + dimensions.width + " " + dimensions.height,
    preserveAspectRatio: "xMinYMin meet",
    connections: paths
  }, passThemeFlag, rest), /*#__PURE__*/_react["default"].createElement("g", null, paths));
});
Diagram.displayName = 'Diagram';
Diagram.propTypes = _propTypes.DiagramPropTypes;