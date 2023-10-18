"use strict";

exports.__esModule = true;
exports.Page = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _Box = require("../Box");
var _PageContext = require("./PageContext");
var _ResponsiveContext = require("../../contexts/ResponsiveContext");
var _propTypes = require("./propTypes");
var _excluded = ["kind"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Page = exports.Page = function Page(_ref) {
  var kind = _ref.kind,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var size = (0, _react.useContext)(_ResponsiveContext.ResponsiveContext);
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);
  var contentValue = (0, _react.useMemo)(function () {
    var _theme$page$kind, _theme$page$kind2;
    return _extends({
      alignSelf: (_theme$page$kind = theme.page[kind]) == null ? void 0 : _theme$page$kind.alignSelf,
      width: (_theme$page$kind2 = theme.page[kind]) == null ? void 0 : _theme$page$kind2.width
    }, theme.page[kind][size]);
  }, [theme, size, kind]);
  return /*#__PURE__*/_react["default"].createElement(_PageContext.PageContext.Provider, {
    value: contentValue
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    fill: "horizontal"
  }, rest)));
};
Page.displayName = 'Page';
Page.propTypes = _propTypes.PagePropTypes;
Page.defaultProps = {
  kind: 'wide'
};