var _excluded = ["connections"],
    _excluded2 = ["anchor", "animation", "color", "offset", "round", "thickness", "type"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { normalizeColor, parseMetricToNum, useForwardedRef } from '../../utils';
import { StyledDiagram } from './StyledDiagram';
import { DiagramPropTypes } from './propTypes';

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

var Diagram = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var connections = _ref.connections,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = useContext(ThemeContext) || defaultProps.theme;

  var _useState = useState({
    width: 0,
    height: 0
  }),
      dimensions = _useState[0],
      setDimensions = _useState[1];

  var _useState2 = useState(),
      connectionPoints = _useState2[0],
      setConnectionPoints = _useState2[1];

  var svgRef = useForwardedRef(ref);
  useEffect(function () {
    setConnectionPoints(undefined);
  }, [connections]);
  var onResize = useCallback(function () {
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
  }, [dimensions.width, dimensions.height, svgRef]); // Ref that stores resize handler

  var savedOnResize = useRef(); // Update resize ref value if onResize changes.
  // This allows our effect below to always get latest handler

  useEffect(function () {
    savedOnResize.current = onResize;
  }, [onResize]);
  useEffect(function () {
    var onResizeHandler = function onResizeHandler(event) {
      return savedOnResize.current(event);
    };

    onResizeHandler();
    window.addEventListener('resize', onResizeHandler);
    return function () {
      window.removeEventListener('resize', onResizeHandler);
    };
  }, []);
  var placeConnections = useCallback(function () {
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
        var toRect = toElement.getBoundingClientRect(); // There is no x and y when unit testing.

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
  useEffect(function () {
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
        var offsetWidth = offset ? parseMetricToNum(theme.global.edgeSize[offset]) : 0;
        var d = COMMANDS[type || 'curved'](points[0], points[1], offsetWidth, anchor);
        var strokeWidth = thickness ? parseMetricToNum(theme.global.edgeSize[thickness] || thickness) : 1;
        var colorName = color || theme.diagram.line && theme.diagram.line.color;

        if (!colorName) {
          var colors = Object.keys(theme.global.colors).filter(function (n) {
            return n.match(/^graph-[0-9]$/);
          });
          colorName = colors[index % colors.length];
        }

        path = /*#__PURE__*/React.createElement("path", _extends({
          // eslint-disable-next-line react/no-array-index-key
          key: index,
          animation: animation
        }, cleanedRest, {
          stroke: normalizeColor(colorName, theme),
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

  return /*#__PURE__*/React.createElement(StyledDiagram, _extends({
    ref: svgRef,
    viewBox: "0 0 " + dimensions.width + " " + dimensions.height,
    preserveAspectRatio: "xMinYMin meet",
    connections: paths
  }, rest), /*#__PURE__*/React.createElement("g", null, paths));
});
Diagram.displayName = 'Diagram';
Diagram.defaultProps = {
  connections: []
};
Diagram.propTypes = DiagramPropTypes;
export { Diagram };