"use strict";

exports.__esModule = true;
exports.Sorter = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _defaultProps = require("../../default-props");
var _Button = require("../Button");
var _Box = require("../Box");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var SorterButton = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "Sorter__SorterButton",
  componentId: "sc-fzr2yb-0"
})(["flex-shrink:1;height:100%;"]);
var Sorter = exports.Sorter = function Sorter(_ref) {
  var align = _ref.align,
    children = _ref.children,
    fill = _ref.fill,
    onSort = _ref.onSort,
    property = _ref.property,
    sort = _ref.sort,
    themeProps = _ref.themeProps;
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;
  var icon;
  if (sort && sort.property === property) {
    var Icon = theme.dataTable.icons[sort.ascending ? 'ascending' : 'descending'];
    icon = /*#__PURE__*/_react["default"].createElement(Icon, null);
  }
  var content = /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({}, themeProps, {
    flex: "shrink",
    direction: "row",
    justify: align,
    align: "center",
    gap: "xsmall",
    fill: fill
  }), children, icon);
  if (onSort) {
    content = /*#__PURE__*/_react["default"].createElement(SorterButton, {
      fill: fill,
      hoverIndicator: true,
      onClick: onSort(property)
    }, content);
  }
  return content;
};
Sorter.displayName = 'Sorter';
Sorter.defaultProps = {};
Object.setPrototypeOf(Sorter.defaultProps, _defaultProps.defaultProps);