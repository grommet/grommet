"use strict";

exports.__esModule = true;
exports.Sorter = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _defaultProps = require("../../default-props");

var _Button = require("../Button");

var _Box = require("../Box");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SorterButton = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "Sorter__SorterButton",
  componentId: "fzr2yb-0"
})(["flex-shrink:1;height:100%;"]);

var Sorter = function Sorter(_ref) {
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

exports.Sorter = Sorter;
Sorter.displayName = 'Sorter';
Sorter.defaultProps = {};
Object.setPrototypeOf(Sorter.defaultProps, _defaultProps.defaultProps);