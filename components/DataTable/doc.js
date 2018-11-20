"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(DataTable) {
  var DocumentedDataTable = (0, _reactDesc.describe)(DataTable).availableAt((0, _utils.getAvailableAtBadge)('DataTable')).description('A data driven table.').usage("import { DataTable } from 'grommet';\n<DataTable />");
  DocumentedDataTable.propTypes = _extends({}, _utils.genericProps, {
    columns: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({
      align: _reactDesc.PropTypes.oneOf(['center', 'start', 'end']),
      aggregate: _reactDesc.PropTypes.oneOf(['avg', 'max', 'min', 'sum']),
      footer: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.node, _reactDesc.PropTypes.shape({
        aggregate: _reactDesc.PropTypes.bool
      })]),
      header: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.node, _reactDesc.PropTypes.shape({
        aggregate: _reactDesc.PropTypes.bool
      })]),
      property: _reactDesc.PropTypes.string.isRequired,
      render: _reactDesc.PropTypes.func,
      search: _reactDesc.PropTypes.bool
    })).description("\n      A description of the data. The order controls the column order.\n      'property' indicates which property in the data objects to associate\n      the column with. 'header' indicates what to display in the column\n      header. 'render' allows for custom rendering of body cells. Use 'render'\n      for custom formatting for things like currency and date or to\n      display rich content like Meters. 'align' indicates how the cells in\n      the column are aligned. 'aggregate' indicates how the data in the\n      column should be aggregated. This only applies to a footer or groupBy\n      context. 'footer' indicates what should be shown in the footer for\n      the column. 'search' indicates whether a search filter should be\n      made available for the column.\n    "),
    data: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({})).description('Array of data objects.'),
    groupBy: _reactDesc.PropTypes.string.description('Property to group data by.'),
    onMore: _reactDesc.PropTypes.func.description("Use this to indicate that 'data' doesn't contain all that it could.\n      It will be called when all of the data rows have been rendered.\n      This might be used when the total number of items that could be retrieved\n      is more than you'd want to load into the browser. 'onMore' allows you\n      to lazily fetch more from the server only when needed. This cannot\n      be combined with properties that expect all data to be present in the\n      browser, such as columns.search, sortable, groupBy, or columns.aggregate."),
    onSearch: _reactDesc.PropTypes.func.description("When supplied, and when at least one column has 'search' enabled,\n      this function will be called with an object with keys for property\n      names and values which are the search text strings. This is typically\n      employed so a back-end can be used to search through the data."),
    resizeable: _reactDesc.PropTypes.bool.description('Whether to allow the user to resize column widths.'),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description("\n      The height of the table body. If set, the table body will have a fixed\n      height and the rows will be scrollable within it. In order to preserve\n      header and footer cell alignment, all cells will have the same\n      width. This cannot be used in combination with 'resizeable'.\n    "),
    sortable: _reactDesc.PropTypes.bool.description('Whether to allow the user to sort columns.')
  });
  return DocumentedDataTable;
};

exports.doc = doc;