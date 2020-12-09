"use strict";

exports.__esModule = true;
exports.Header = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _CheckBox = require("../CheckBox");

var _TableCell = require("../TableCell");

var _Text = require("../Text");

var _Resizer = require("./Resizer");

var _Searcher = require("./Searcher");

var _ExpanderCell = require("./ExpanderCell");

var _StyledDataTable = require("./StyledDataTable");

var _buildState = require("./buildState");

var _styles = require("../../utils/styles");

var _colors = require("../../utils/colors");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// separate theme values into groupings depending on what
// part of header cell they should style
var separateThemeProps = function separateThemeProps(theme) {
  var _theme$dataTable$head = theme.dataTable.header,
      background = _theme$dataTable$head.background,
      border = _theme$dataTable$head.border,
      color = _theme$dataTable$head.color,
      font = _theme$dataTable$head.font,
      gap = _theme$dataTable$head.gap,
      units = _theme$dataTable$head.units,
      rest = _objectWithoutPropertiesLoose(_theme$dataTable$head, ["background", "border", "color", "font", "gap", "units"]);

  var cellProps = {
    background: background,
    border: border
  };

  var textProps = _extends({
    color: color
  }, font);

  var iconProps = {
    color: color
  };

  var layoutProps = _extends({}, rest);

  return [cellProps, layoutProps, textProps, iconProps];
}; // build up CSS from basic to specific based on the supplied sub-object paths.
// adapted from StyledButtonKind to only include parts relevant for DataTable


var buttonStyle = function buttonStyle(_ref) {
  var theme = _ref.theme;
  var styles = [];

  var _separateThemeProps = separateThemeProps(theme),
      layoutProps = _separateThemeProps[1],
      iconProps = _separateThemeProps[3];

  if (layoutProps) {
    styles.push((0, _styles.kindPartStyles)(layoutProps, theme));
  }

  if (layoutProps.hover) {
    // CSS for this sub-object in the theme
    var partStyles = (0, _styles.kindPartStyles)(layoutProps.hover, theme);
    if (partStyles.length > 0) styles.push((0, _styledComponents.css)(["&:hover{", "}"], partStyles));
  }

  if (iconProps.color) {
    styles.push((0, _styledComponents.css)(["svg{stroke:", ";fill:", ";}"], (0, _colors.normalizeColor)(iconProps.color, theme), (0, _colors.normalizeColor)(iconProps.color, theme)));
  }

  return styles;
};

var StyledHeaderCellButton = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "Header__StyledHeaderCellButton",
  componentId: "sc-1baku5q-0"
})(["", ""], function (props) {
  return buttonStyle(props);
}); // allow extend to spread onto Box that surrounds column label

var StyledContentBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "Header__StyledContentBox",
  componentId: "sc-1baku5q-1"
})(["", ""], function (props) {
  return props.extend;
});
var Header = /*#__PURE__*/(0, _react.forwardRef)(function (_ref2, ref) {
  var backgroundProp = _ref2.background,
      border = _ref2.border,
      columns = _ref2.columns,
      data = _ref2.data,
      fill = _ref2.fill,
      filtering = _ref2.filtering,
      filters = _ref2.filters,
      groups = _ref2.groups,
      groupState = _ref2.groupState,
      onFilter = _ref2.onFilter,
      onFiltering = _ref2.onFiltering,
      onResize = _ref2.onResize,
      onSelect = _ref2.onSelect,
      onSort = _ref2.onSort,
      onToggle = _ref2.onToggle,
      pad = _ref2.pad,
      tablePin = _ref2.pin,
      primaryProperty = _ref2.primaryProperty,
      selected = _ref2.selected,
      sort = _ref2.sort,
      widths = _ref2.widths,
      rest = _objectWithoutPropertiesLoose(_ref2, ["background", "border", "columns", "data", "fill", "filtering", "filters", "groups", "groupState", "onFilter", "onFiltering", "onResize", "onSelect", "onSort", "onToggle", "pad", "pin", "primaryProperty", "selected", "sort", "widths"]);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var _separateThemeProps2 = separateThemeProps(theme),
      cellProps = _separateThemeProps2[0],
      layoutProps = _separateThemeProps2[1],
      textProps = _separateThemeProps2[2];

  var background;
  if (backgroundProp) background = backgroundProp;else background = undefined;
  return /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableHeader, _extends({
    ref: ref,
    fillProp: fill
  }, rest), /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableRow, null, groups && /*#__PURE__*/_react["default"].createElement(_ExpanderCell.ExpanderCell, {
    context: "header",
    expanded: Object.keys(groupState).filter(function (k) {
      return !groupState[k].expanded;
    }).length === 0,
    onToggle: onToggle
  }), (selected || onSelect) && /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, {
    background: background || cellProps.background
  }, onSelect && /*#__PURE__*/_react["default"].createElement(_CheckBox.CheckBox, {
    checked: selected.length === data.length,
    indeterminate: selected.length > 0 && selected.length < data.length,
    onChange: function onChange() {
      // if any are selected, clear selection
      if (selected.length === data.length) onSelect([]); // if none are selected, select all data
      else onSelect(data.map(function (datum) {
          return (0, _buildState.datumValue)(datum, primaryProperty);
        }));
    }
  })), columns.map(function (_ref3) {
    var property = _ref3.property,
        header = _ref3.header,
        align = _ref3.align,
        columnPin = _ref3.pin,
        search = _ref3.search,
        sortable = _ref3.sortable,
        verticalAlign = _ref3.verticalAlign,
        size = _ref3.size,
        units = _ref3.units;
    var content;
    var unitsContent = units ? /*#__PURE__*/_react["default"].createElement(_Text.Text, _extends({}, textProps, theme.dataTable.header.units), units) : undefined;

    if (typeof header === 'string') {
      content = /*#__PURE__*/_react["default"].createElement(_Text.Text, textProps, header);

      if (Object.keys(layoutProps).length && (sortable === false || !onSort)) {
        // apply rest of layout styling if cell is not sortable,
        // otherwise this styling will be applied by
        // StyledHeaderCellButton
        content = /*#__PURE__*/_react["default"].createElement(StyledContentBox, layoutProps, content);
      }
    } else content = header;

    if (onSort && sortable !== false) {
      var Icon;

      if (onSort && sortable !== false) {
        if (sort && sort.property === property) {
          Icon = theme.dataTable.icons[sort.direction !== 'asc' ? 'ascending' : 'descending'];
        } else if (theme.dataTable.icons.sortable) {
          Icon = theme.dataTable.icons.sortable;
        }
      }

      content = /*#__PURE__*/_react["default"].createElement(StyledHeaderCellButton, {
        plain: true,
        column: property,
        fill: "vertical",
        onClick: onSort(property),
        sort: sort,
        sortable: true
      }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
        direction: "row",
        align: "center",
        gap: "xsmall",
        justify: align
      }, content, Icon && /*#__PURE__*/_react["default"].createElement(Icon, null)));
    }

    if (unitsContent) {
      content = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
        align: "baseline",
        direction: "row"
      }, content, unitsContent);
    } // content should fill any available space in cell


    content = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      flex: "grow"
    }, content);

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
        gap: theme.dataTable.header.gap,
        fill: "vertical",
        style: onResize ? {
          position: 'relative'
        } : undefined
      }, content, searcher && resizer ? /*#__PURE__*/_react["default"].createElement(_Box.Box, {
        flex: "shrink",
        direction: "row",
        align: "center",
        gap: theme.dataTable.header.gap
      }, searcher, resizer) : searcher || resizer);
    }

    var pin = [];
    if (tablePin) pin.push('top');
    if (columnPin) pin.push('left');
    if (backgroundProp) background = backgroundProp;else if (pin.length > 0 && theme.dataTable.pinned && theme.dataTable.pinned.header) {
      background = theme.dataTable.pinned.header.background;
    } else background = undefined;
    return /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableCell, {
      key: property,
      align: align,
      context: "header",
      verticalAlign: verticalAlign,
      background: background || cellProps.background,
      border: border || cellProps.border,
      pad: pad,
      pin: pin,
      plain: true,
      scope: "col",
      size: widths && widths[property] ? undefined : size,
      style: widths && widths[property] ? {
        width: widths[property]
      } : undefined
    }, content);
  })));
});
exports.Header = Header;
Header.displayName = 'Header';
Header.defaultProps = {};
Object.setPrototypeOf(Header.defaultProps, _defaultProps.defaultProps);