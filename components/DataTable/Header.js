"use strict";

exports.__esModule = true;
exports.Header = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _TableCell = require("../TableCell");

var _Text = require("../Text");

var _Resizer = require("./Resizer");

var _Searcher = require("./Searcher");

var _Sorter = require("./Sorter");

var _ExpanderCell = require("./ExpanderCell");

var _StyledDataTable = require("./StyledDataTable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Header = function Header(_ref) {
  var columns = _ref.columns,
      filtering = _ref.filtering,
      filters = _ref.filters,
      groups = _ref.groups,
      groupState = _ref.groupState,
      onFilter = _ref.onFilter,
      onFiltering = _ref.onFiltering,
      onResize = _ref.onResize,
      onSort = _ref.onSort,
      onToggle = _ref.onToggle,
      sort = _ref.sort,
      theme = _ref.theme,
      widths = _ref.widths,
      rest = _objectWithoutPropertiesLoose(_ref, ["columns", "filtering", "filters", "groups", "groupState", "onFilter", "onFiltering", "onResize", "onSort", "onToggle", "sort", "theme", "widths"]);

  var dataTableContextTheme = _extends({}, theme.table.header, theme.dataTable.header); // The tricky part here is that we need to manage the theme styling
  // to make sure that the background, border, and padding are applied
  // at the right places depending on the mix of controls in each header cell.


  var outerThemeProps = function (_ref2) {
    var border = _ref2.border,
        background = _ref2.background;
    return {
      border: border,
      background: background
    };
  }(dataTableContextTheme);

  var border = dataTableContextTheme.border,
      background = dataTableContextTheme.background,
      innerThemeProps = _objectWithoutPropertiesLoose(dataTableContextTheme, ["border", "background"]);

  return _react.default.createElement(_StyledDataTable.StyledDataTableHeader, rest, _react.default.createElement(_StyledDataTable.StyledDataTableRow, null, groups && _react.default.createElement(_ExpanderCell.ExpanderCell, {
    context: "header",
    expanded: Object.keys(groupState).filter(function (k) {
      return !groupState[k].expanded;
    }).length === 0,
    onToggle: onToggle
  }), columns.map(function (_ref3) {
    var property = _ref3.property,
        header = _ref3.header,
        align = _ref3.align,
        search = _ref3.search,
        sortable = _ref3.sortable;
    var content = typeof header === 'string' ? _react.default.createElement(_Text.Text, null, header) : header;

    if (onSort && sortable !== false) {
      content = _react.default.createElement(_Sorter.Sorter, {
        align: align,
        fill: !search,
        property: property,
        onSort: onSort,
        sort: sort,
        themeProps: search ? innerThemeProps : dataTableContextTheme
      }, content);
    }

    if (search && filters) {
      if (!onSort) {
        content = _react.default.createElement(_Box.Box, _extends({
          justify: "center",
          align: align
        }, innerThemeProps), content);
      }

      content = _react.default.createElement(_Box.Box, _extends({
        fill: true,
        direction: "row",
        justify: "between",
        align: "center"
      }, outerThemeProps), content, _react.default.createElement(_Searcher.Searcher, {
        filtering: filtering,
        filters: filters,
        property: property,
        onFilter: onFilter,
        onFiltering: onFiltering
      }));
    } else if (!onSort || sortable === false) {
      content = _react.default.createElement(_Box.Box, _extends({}, dataTableContextTheme, {
        fill: true,
        justify: "center",
        align: align
      }), content);
    }

    if (onResize) {
      content = _react.default.createElement(_Resizer.Resizer, {
        property: property,
        onResize: onResize
      }, content);
    }

    return _react.default.createElement(_TableCell.TableCell, {
      key: property,
      scope: "col",
      plain: true,
      style: widths && widths[property] ? {
        width: widths[property]
      } : undefined
    }, content);
  })));
};

Header.defaultProps = {};
Object.setPrototypeOf(Header.defaultProps, _defaultProps.defaultProps);
var HeaderWrapper = (0, _recompose.compose)(_styledComponents.withTheme)(Header);
exports.Header = HeaderWrapper;