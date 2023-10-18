"use strict";

exports.__esModule = true;
exports["default"] = exports.Progressing = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _excluded = ["id"],
  _excluded2 = ["color"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
var Progressing = exports.Progressing = function Progressing() {
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
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
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
    })))
    // </Grommet>
  );
};

Progressing.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Visualizations/Diagram/Progressing'
};