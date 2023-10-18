"use strict";

exports.__esModule = true;
exports.NameValuePair = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _Box = require("../Box");
var _Text = require("../Text");
var _ResponsiveContext = require("../../contexts/ResponsiveContext");
var _NameValueListContext = require("../NameValueList/NameValueListContext");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var NameValuePair = exports.NameValuePair = function NameValuePair(_ref) {
  var _theme$nameValuePair;
  var children = _ref.children,
    nameProp = _ref.name;
  var _useContext = (0, _react.useContext)(_NameValueListContext.NameValueListContext),
    nameProps = _useContext.nameProps,
    pairProps = _useContext.pairProps,
    valueProps = _useContext.valueProps;
  var size = (0, _react.useContext)(_ResponsiveContext.ResponsiveContext);
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);
  var direction = pairProps == null ? void 0 : pairProps.direction;
  var column = direction === 'column' || direction === 'column-reverse' || size === 'small';
  var Container = column ? _Box.Box : _react.Fragment;
  var nameAlign = size !== 'small' ? nameProps == null ? void 0 : nameProps.align : undefined;
  var valueAlign = size !== 'small' ? valueProps == null ? void 0 : valueProps.align : undefined;
  // using margin to act as gap
  // <dl> elements must only directly contain
  // properly-ordered <dt> and <dd> groups
  var valueGap;
  if (column && (_theme$nameValuePair = theme.nameValuePair) != null && (_theme$nameValuePair = _theme$nameValuePair.column) != null && _theme$nameValuePair.gap) valueGap = {
    bottom: theme.nameValuePair.column.gap
  };
  var name;
  if (typeof nameProp === 'string' || typeof nameProp === 'number') name = /*#__PURE__*/_react["default"].createElement(_Text.Text, _extends({
    as: "dt",
    margin: valueGap,
    textAlign: nameAlign
  }, theme.nameValuePair.name), nameProp);else name = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    as: "dt",
    align: nameAlign
  }, nameProp);
  var value;
  if (typeof children === 'string' || typeof children === 'number') value =
  /*#__PURE__*/
  // override browser default margin for dd
  _react["default"].createElement(_Text.Text, _extends({
    as: "dd",
    margin: "none",
    textAlign: valueAlign
  }, theme.nameValuePair.value), children);else value =
  /*#__PURE__*/
  // override browser default margin for dd
  _react["default"].createElement(_Box.Box, {
    margin: "none",
    as: "dd",
    align: valueAlign
  }, children);
  var first = direction !== 'column-reverse' ? name : value;
  var second = direction !== 'column-reverse' ? value : name;
  return /*#__PURE__*/_react["default"].createElement(Container, null, first, second);
};