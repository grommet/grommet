"use strict";

exports.__esModule = true;
exports.Sorter = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Button = require("../Button");
var _Box = require("../Box");
var _useThemeValue2 = require("../../utils/useThemeValue");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
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