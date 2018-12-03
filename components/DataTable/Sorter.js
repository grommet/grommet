"use strict";

exports.__esModule = true;
exports.Sorter = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _defaultProps = require("../../default-props");

var _Button = require("../Button");

var _Box = require("../Box");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SorterButton = (0, _styledComponents.default)(_Button.Button).withConfig({
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
      theme = _ref.theme,
      themeProps = _ref.themeProps;
  var icon;

  if (sort && sort.property === property) {
    var Icon = theme.dataTable.icons[sort.ascending ? 'ascending' : 'descending'];
    icon = _react.default.createElement(Icon, null);
  }

  var content = _react.default.createElement(_Box.Box, _extends({}, themeProps, {
    flex: "shrink",
    direction: "row",
    justify: align,
    align: "center",
    gap: "xsmall",
    fill: fill
  }), children, icon);

  if (onSort) {
    content = _react.default.createElement(SorterButton, {
      fill: fill,
      hoverIndicator: true,
      onClick: onSort(property)
    }, content);
  }

  return content;
};

Sorter.defaultProps = {};
Object.setPrototypeOf(Sorter.defaultProps, _defaultProps.defaultProps);
var SorterWrapper = (0, _recompose.compose)(_styledComponents.withTheme)(Sorter);
exports.Sorter = SorterWrapper;