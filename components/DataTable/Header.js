"use strict";

exports.__esModule = true;
exports.Header = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _TableCell = require("../TableCell");

var _Text = require("../Text");

var _Resizer = require("./Resizer");

var _Searcher = require("./Searcher");

var _ExpanderCell = require("./ExpanderCell");

var _StyledDataTable = require("./StyledDataTable");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Header = function Header(_ref) {
  var background = _ref.background,
      border = _ref.border,
      columns = _ref.columns,
      filtering = _ref.filtering,
      filters = _ref.filters,
      groups = _ref.groups,
      groupState = _ref.groupState,
      onFilter = _ref.onFilter,
      onFiltering = _ref.onFiltering,
      onResize = _ref.onResize,
      onSort = _ref.onSort,
      onToggle = _ref.onToggle,
      pad = _ref.pad,
      sort = _ref.sort,
      widths = _ref.widths,
      rest = _objectWithoutPropertiesLoose(_ref, ["background", "border", "columns", "filtering", "filters", "groups", "groupState", "onFilter", "onFiltering", "onResize", "onSort", "onToggle", "pad", "sort", "widths"]);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  return /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableHeader, rest, /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableRow, null, groups && /*#__PURE__*/_react["default"].createElement(_ExpanderCell.ExpanderCell, {
    context: "header",
    expanded: Object.keys(groupState).filter(function (k) {
      return !groupState[k].expanded;
    }).length === 0,
    onToggle: onToggle
  }), columns.map(function (_ref2) {
    var property = _ref2.property,
        header = _ref2.header,
        align = _ref2.align,
        search = _ref2.search,
        sortable = _ref2.sortable,
        verticalAlign = _ref2.verticalAlign,
        size = _ref2.size;
    var content = typeof header === 'string' ? /*#__PURE__*/_react["default"].createElement(_Text.Text, null, header) : header;

    if (onSort && sortable !== false) {
      var Icon = onSort && sortable !== false && sort && sort.property === property && theme.dataTable.icons[sort.direction !== 'asc' ? 'ascending' : 'descending'];
      content = /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        plain: true,
        fill: "vertical",
        onClick: onSort(property)
      }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
        direction: "row",
        align: "center",
        gap: "xsmall"
      }, content, Icon && /*#__PURE__*/_react["default"].createElement(Icon, null)));
    }

    if (search || onResize) {
      var resizer = onResize ? /*#__PURE__*/_react["default"].createElement(_Resizer.Resizer, {
        property: property,
        onResize: onResize
      }) : null;
      var searcher = search && filters ? /*#__PURE__*/_react["default"].createElement(_Searcher.Searcher, {
        filtering: filtering,
        filters: filters,
        property: property,
        onFilter: onFilter,
        onFiltering: onFiltering
      }) : null;
      content = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
        direction: "row",
        align: "center",
        justify: !align || align === 'start' ? 'between' : align,
        gap: "small",
        fill: "vertical",
        style: onResize ? {
          position: 'relative'
        } : undefined
      }, content, searcher && resizer ? /*#__PURE__*/_react["default"].createElement(_Box.Box, {
        flex: "shrink",
        direction: "row",
        align: "center",
        gap: "small"
      }, searcher, resizer) : searcher || resizer);
    }

    return /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, {
      key: property,
      align: align,
      verticalAlign: verticalAlign,
      background: background,
      border: border,
      pad: pad,
      plain: true,
      scope: "col",
      size: widths && widths[property] ? undefined : size,
      style: widths && widths[property] ? {
        width: widths[property]
      } : undefined
    }, content);
  })));
};

exports.Header = Header;
Header.displayName = 'Header';
Header.defaultProps = {};
Object.setPrototypeOf(Header.defaultProps, _defaultProps.defaultProps);