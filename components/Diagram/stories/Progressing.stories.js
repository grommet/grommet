"use strict";

exports.__esModule = true;
exports["default"] = exports.Progressing = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _excluded = ["id"],
  _excluded2 = ["color"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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