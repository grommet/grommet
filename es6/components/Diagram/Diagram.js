function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { defaultProps } from '../../default-props';
import { normalizeColor, parseMetricToNum } from '../../utils';
import { StyledDiagram } from './StyledDiagram';

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

var Diagram =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Diagram, _Component);

  function Diagram() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      height: 0,
      width: 0
    });

    _defineProperty(_assertThisInitialized(_this), "svgRef", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "onResize", function () {
      var _this$state = _this.state,
          width = _this$state.width,
          height = _this$state.height;
      var svg = _this.svgRef.current;

      if (svg) {
        var rect = svg.getBoundingClientRect();

        if (rect.width !== width || rect.height !== height) {
          _this.setState({
            width: rect.width,
            height: rect.height,
            connectionPoints: undefined
          });
        }
      }
    });

    return _this;
  }

  Diagram.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    // track whether the connections array changes so we can trigger re-placing
    if (nextProps.connections !== prevState.connections) {
      return {
        connections: nextProps.connections,
        connectionPoints: undefined
      };
    }

    return null;
  };

  var _proto = Diagram.prototype;

  _proto.componentDidMount = function componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    var connectionPoints = this.state.connectionPoints;

    if (!connectionPoints) {
      this.placeConnections();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  };

  _proto.placeConnections = function placeConnections() {
    var connections = this.props.connections;
    var containerRect = this.svgRef.current.getBoundingClientRect();
    var connectionPoints = connections.map(function (_ref) {
      var anchor = _ref.anchor,
          fromTarget = _ref.fromTarget,
          toTarget = _ref.toTarget;
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
    this.setState({
      connectionPoints: connectionPoints
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        connections = _this$props.connections,
        theme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["connections", "theme"]);

    var _this$state2 = this.state,
        connectionPoints = _this$state2.connectionPoints,
        height = _this$state2.height,
        width = _this$state2.width;
    var paths;

    if (connectionPoints) {
      paths = connections.map(function (_ref2, index) {
        var anchor = _ref2.anchor,
            color = _ref2.color,
            offset = _ref2.offset,
            round = _ref2.round,
            thickness = _ref2.thickness,
            type = _ref2.type,
            connectionRest = _objectWithoutPropertiesLoose(_ref2, ["anchor", "color", "offset", "round", "thickness", "type"]);

        var path;

        var cleanedRest = _extends({}, connectionRest);

        delete cleanedRest.fromTarget;
        delete cleanedRest.toTarget;
        var points = connectionPoints[index];

        if (points) {
          var offsetWidth = offset ? parseMetricToNum(theme.global.edgeSize[offset]) : 0;
          var d = COMMANDS[type || 'curved'](points[0], points[1], offsetWidth, anchor);
          var strokeWidth = thickness ? parseMetricToNum(theme.global.edgeSize[thickness] || thickness) : 1;
          path = React.createElement("path", _extends({
            // eslint-disable-next-line react/no-array-index-key
            key: index
          }, cleanedRest, {
            stroke: normalizeColor(color || theme.diagram.line.color, theme),
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

    return React.createElement(StyledDiagram, _extends({
      ref: this.svgRef,
      viewBox: "0 0 " + width + " " + height,
      preserveAspectRatio: "xMinYMin meet"
    }, rest), React.createElement("g", null, paths));
  };

  return Diagram;
}(Component);

_defineProperty(Diagram, "defaultProps", {
  connections: []
});

Object.setPrototypeOf(Diagram.defaultProps, defaultProps);
var DiagramDoc;

if (process.env.NODE_ENV !== 'production') {
  DiagramDoc = require('./doc').doc(Diagram); // eslint-disable-line global-require
}

var DiagramWrapper = compose(withTheme)(DiagramDoc || Diagram);
export { DiagramWrapper as Diagram };