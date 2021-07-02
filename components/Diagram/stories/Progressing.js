"use strict";

exports.__esModule = true;
exports["default"] = exports.Progressing = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _excluded = ["id"],
    _excluded2 = ["color"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Node = function Node(_ref) {
  var id = _ref.id,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, _extends({
    id: id,
    basis: "xxsmall",
    margin: "small",
    pad: "medium",
    round: "small",
    background: "dark-3"
  }, rest));
};

var connection = function connection(fromTarget, toTarget, _temp) {
  var _ref2 = _temp === void 0 ? {} : _temp,
      color = _ref2.color,
      rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);

  return _extends({
    fromTarget: fromTarget,
    toTarget: toTarget,
    anchor: 'vertical',
    color: color,
    thickness: 'xsmall',
    round: true,
    type: 'rectilinear'
  }, rest);
};

var fullTopRow = [1, 2, 3];

var Progressing = function Progressing() {
  var reducer = function reducer(topRow) {
    var sliceEnd = topRow.length < fullTopRow.length ? topRow.length + 1 : 1;
    return fullTopRow.slice(0, sliceEnd);
  };

  var _useReducer = (0, _react.useReducer)(reducer, fullTopRow.slice(0, 1)),
      topRow = _useReducer[0],
      dispatch = _useReducer[1];

  (0, _react.useEffect)(function () {
    var timer = setInterval(function () {
      dispatch();
    }, 3000);
    return function () {
      return clearInterval(timer);
    };
  }, [dispatch]);
  var connections = [connection('1', '5')];

  if (topRow.length >= 2) {
    connections.push(connection('1', '2', {
      anchor: 'horizontal'
    }));
  }

  if (topRow.length >= 3) {
    connections.push(connection('3', '5', {
      anchor: 'horizontal',
      animation: {
        type: 'pulse',
        duration: 500,
        size: 'small'
      },
      color: 'brand'
    }));
  }

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Adding and removing nodes with animated connections. The animation 'draw' is applied to the entire diagram, however, the last connection receives its own animation type of 'pulse'."), /*#__PURE__*/_react["default"].createElement(_grommet.Stack, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row"
  }, topRow.map(function (id) {
    return /*#__PURE__*/_react["default"].createElement(Node, {
      key: id,
      id: id
    });
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row"
  }, [4, 5].map(function (id) {
    return /*#__PURE__*/_react["default"].createElement(Node, {
      key: id,
      id: id,
      background: "dark-2"
    });
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Diagram, {
    animation: {
      type: 'draw',
      duration: 3000
    },
    connections: connections
  }))));
};

exports.Progressing = Progressing;
Progressing.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Visualizations/Diagram/Progressing'
};
exports["default"] = _default;