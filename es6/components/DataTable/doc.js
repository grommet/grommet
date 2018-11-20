function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, getAvailableAtBadge } from '../../utils';
export var doc = function doc(DataTable) {
  var DocumentedDataTable = describe(DataTable).availableAt(getAvailableAtBadge('DataTable')).description('A data driven table.').usage("import { DataTable } from 'grommet';\n<DataTable />");
  DocumentedDataTable.propTypes = _extends({}, genericProps, {
    columns: PropTypes.arrayOf(PropTypes.shape({
      align: PropTypes.oneOf(['center', 'start', 'end']),
      aggregate: PropTypes.oneOf(['avg', 'max', 'min', 'sum']),
      footer: PropTypes.oneOfType([PropTypes.node, PropTypes.shape({
        aggregate: PropTypes.bool
      })]),
      header: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.shape({
        aggregate: PropTypes.bool
      })]),
      property: PropTypes.string.isRequired,
      render: PropTypes.func,
      search: PropTypes.bool
    })).description("\n      A description of the data. The order controls the column order.\n      'property' indicates which property in the data objects to associate\n      the column with. 'header' indicates what to display in the column\n      header. 'render' allows for custom rendering of body cells. Use 'render'\n      for custom formatting for things like currency and date or to\n      display rich content like Meters. 'align' indicates how the cells in\n      the column are aligned. 'aggregate' indicates how the data in the\n      column should be aggregated. This only applies to a footer or groupBy\n      context. 'footer' indicates what should be shown in the footer for\n      the column. 'search' indicates whether a search filter should be\n      made available for the column.\n    "),
    data: PropTypes.arrayOf(PropTypes.shape({})).description('Array of data objects.'),
    groupBy: PropTypes.string.description('Property to group data by.'),
    onMore: PropTypes.func.description("Use this to indicate that 'data' doesn't contain all that it could.\n      It will be called when all of the data rows have been rendered.\n      This might be used when the total number of items that could be retrieved\n      is more than you'd want to load into the browser. 'onMore' allows you\n      to lazily fetch more from the server only when needed. This cannot\n      be combined with properties that expect all data to be present in the\n      browser, such as columns.search, sortable, groupBy, or columns.aggregate."),
    onSearch: PropTypes.func.description("When supplied, and when at least one column has 'search' enabled,\n      this function will be called with an object with keys for property\n      names and values which are the search text strings. This is typically\n      employed so a back-end can be used to search through the data."),
    resizeable: PropTypes.bool.description('Whether to allow the user to resize column widths.'),
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), PropTypes.string]).description("\n      The height of the table body. If set, the table body will have a fixed\n      height and the rows will be scrollable within it. In order to preserve\n      header and footer cell alignment, all cells will have the same\n      width. This cannot be used in combination with 'resizeable'.\n    "),
    sortable: PropTypes.bool.description('Whether to allow the user to sort columns.')
  });
  return DocumentedDataTable;
};