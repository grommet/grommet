function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, getAvailableAtBadge } from '../../utils';
var sizes = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
var sides = ['horizontal', 'vertical', 'top', 'bottom', 'left', 'right'];
var parts = ['header', 'body', 'footer'];
var padShapeSides = {};
sides.forEach(function (side) {
  padShapeSides[side] = PropTypes.oneOfType([PropTypes.oneOf(sizes), PropTypes.string]);
});
var padShapeParts = {};
parts.forEach(function (part) {
  padShapeParts[part] = {};
  sides.forEach(function (side) {
    padShapeParts[part][side] = PropTypes.oneOf(sizes);
  });
});
var backgroundShape = {};
parts.forEach(function (part) {
  backgroundShape[part] = PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    dark: PropTypes.string,
    light: PropTypes.string
  }), PropTypes.arrayOf(PropTypes.string)]);
});
var borderTypes = [PropTypes.bool, PropTypes.oneOf(sides), PropTypes.shape({
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    dark: PropTypes.string,
    light: PropTypes.string
  })]),
  side: PropTypes.oneOf(sides),
  size: PropTypes.oneOfType([PropTypes.oneOf(sizes), PropTypes.string])
})];
var borderShape = {};
parts.forEach(function (part) {
  borderShape[part] = PropTypes.oneOfType(borderTypes);
});
export var doc = function doc(DataTable) {
  var DocumentedDataTable = describe(DataTable).availableAt(getAvailableAtBadge('DataTable')).description('A data driven table.').usage("import { DataTable } from 'grommet';\n<DataTable />").intrinsicElement('table');
  DocumentedDataTable.propTypes = _extends({}, genericProps, {
    background: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string), PropTypes.shape(backgroundShape)]).description("Cell background. You can set the background per context by passing an\n      object with keys for 'heading', 'body', and/or 'footer'. If you pass\n      an array, rows will cycle between the array values."),
    border: PropTypes.oneOfType([].concat(borderTypes, [PropTypes.shape(borderShape)])).description("Cell border. You can set the border per context by passing an\n      object with keys for 'heading', 'body', and/or 'footer'."),
    columns: PropTypes.arrayOf(PropTypes.shape({
      align: PropTypes.oneOf(['center', 'start', 'end']),
      aggregate: PropTypes.oneOf(['avg', 'max', 'min', 'sum']),
      footer: PropTypes.oneOfType([PropTypes.node, PropTypes.shape({
        aggregate: PropTypes.bool
      })]),
      header: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.shape({
        aggregate: PropTypes.bool
      })]),
      primary: PropTypes.bool,
      property: PropTypes.string.isRequired,
      render: PropTypes.func,
      search: PropTypes.bool,
      sortable: PropTypes.bool,
      size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', '1/2', '1/4', '2/4', '3/4', '1/3', '2/3']), PropTypes.string]),
      verticalAlign: PropTypes.oneOf(['middle', 'top', 'bottom'])
    })).description("A description of the data. The order controls the column order.\n      'property' indicates which property in the data objects to associate\n      the column with. 'header' indicates what to display in the column\n      header. 'render' allows for custom rendering of body cells. Use 'render'\n      for custom formatting for things like currency and date or to\n      display rich content like Meters. 'align' indicates how the cells in\n      the column are aligned. 'aggregate' indicates how the data in the\n      column should be aggregated. This only applies to a footer or groupBy\n      context. 'footer' indicates what should be shown in the footer for\n      the column. 'search' indicates whether a search filter should be\n      made available for the column. 'primary' indicates that this property\n      should be used as the unique identifier, which gives the cell 'row' scope\n      for accessibility. If 'primary' is not used for any column, and\n      'primaryKey' isn't specified either, then the first column will be used."),
    data: PropTypes.arrayOf(PropTypes.shape({})).description('Array of data objects.'),
    groupBy: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      property: PropTypes.string,
      expand: PropTypes.arrayOf(PropTypes.string),
      onExpand: PropTypes.func
    })]).description("Property to group data by. If object is specified\n      'property' is used to group data by, 'expand' accepts array of \n       group keys that sets expanded groups and 'onExpand' is a function\n       that will be called after expand button is clicked with\n       an array of keys of expanded groups."),
    onMore: PropTypes.func.description("Use this to indicate that 'data' doesn't contain all that it could.\n      It will be called when all of the data rows have been rendered.\n      This might be used when the total number of items that could be retrieved\n      is more than you'd want to load into the browser. 'onMore' allows you\n      to lazily fetch more from the server only when needed. This cannot\n      be combined with properties that expect all data to be present in the\n      browser, such as columns.search, sortable, groupBy, or \n      columns.aggregate."),
    replace: PropTypes.bool.description("Whether to replace previously rendered items with a generic spacing\n      element when they have scrolled out of view. This is more performant but\n      means that in-page searching will not find elements that have been\n      replaced."),
    onClickRow: PropTypes.func.description("When supplied, this function will be called with an event object that\n      include a 'datum' property containing the data value associated with\n      the clicked row. You should not include interactive elements, like\n      Anchor or Button inside table cells as that can cause confusion with\n      overlapping interactive elements."),
    onSearch: PropTypes.func.description("When supplied, and when at least one column has 'search' enabled,\n      this function will be called with an object with keys for property\n      names and values which are the search text strings. This is typically\n      employed so a back-end can be used to search through the data."),
    onSort: PropTypes.func.description("When supplied, this function will be called with an object\n      with a 'property' property that indicates which property\n      is being sorted on and a 'direction' property that will either be\n      'asc' or 'desc'. onSort={({ property, direction }) => {}}"),
    pad: PropTypes.oneOfType([PropTypes.oneOf(sizes), PropTypes.string, PropTypes.shape(padShapeSides), PropTypes.shape(padShapeParts)]).description("Cell padding. You can set the padding per context by passing an\n      object with keys for 'heading', 'body', and/or 'footer'."),
    primaryKey: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).description("When supplied, indicates the property for a data object to use to\n      get a unique identifier. See also the 'columns.primary' description.\n      Use this property when the columns approach will not work for your\n      data set. Setting primaryKey to false indicates there should be no\n      unique identifier, avoid this as it's less accessible."),
    resizeable: PropTypes.bool.description('Whether to allow the user to resize column widths.'),
    rowProps: PropTypes.shape({}).description("Row specific background, border, and pad, keyed by primary key value.\n      For example:\n      { \"primary-key-value\": { background: ..., border: ..., pad: ... }},\n      where the background, border, and pad accept the same values as\n      the same named properties on DataTable."),
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), PropTypes.string]).description("The height of the table body. If set, the table body will have a fixed\n      height and the rows will be scrollable within it. In order to preserve\n      header and footer cell alignment, all cells will have the same\n      width. This cannot be used in combination with 'resizeable'."),
    sort: PropTypes.shape({
      direction: PropTypes.oneOf(['asc', 'desc']),
      property: PropTypes.string.isRequired
    }).description('Which property to sort on and which direction to sort.'),
    sortable: PropTypes.bool.description('Whether to allow the user to sort columns.'),
    step: PropTypes.number.description('How many items to render at a time.').defaultValue(50)
  });
  return DocumentedDataTable;
};
export var themeDoc = {
  'global.hover.background': {
    description: 'The background style when hovering over an interactive row.',
    type: 'string | { color: string, opacity: string }',
    defaultValue: "{ color: 'active', opacity: 'medium' }"
  },
  'global.hover.color': {
    description: 'The text color when hovering over an interactive row.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: 'white', light: 'black' }"
  },
  'dataTable.body.extend': {
    description: 'Any additional style for an DataTable Body',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'dataTable.groupHeader.background': {
    description: 'The background color of the group header.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: 'dark-2', light: 'light-2' }"
  },
  'dataTable.groupHeader.border.side': {
    description: 'The border side rendered for the group header.',
    type: 'string',
    defaultValue: 'bottom'
  },
  'dataTable.groupHeader.border.size': {
    description: 'The border size of the group header border.',
    type: 'string',
    defaultValue: 'xsmall'
  },
  'dataTable.groupHeader.fill': {
    description: 'Whether the height should fill the group header.',
    type: 'string',
    defaultValue: 'vertical'
  },
  'dataTable.groupHeader.pad': {
    description: 'The pad used for the group header.',
    type: 'string | object',
    defaultValue: "{ horizontal: 'small', vertical: 'xsmall' }"
  },
  'dataTable.header': {
    description: 'Styles for the header.',
    type: 'object',
    defaultValue: '{}'
  },
  'dataTable.icons.ascending': {
    description: 'The ascending icon.',
    type: 'React.Element',
    defaultValue: '<FormDown />'
  },
  'dataTable.icons.contract': {
    description: 'The contract icon.',
    type: 'React.Element',
    defaultValue: '<FormUp />'
  },
  'dataTable.icons.descending': {
    description: 'The descending icon.',
    type: 'React.Element',
    defaultValue: '<FormUp />'
  },
  'dataTable.icons.expand': {
    description: 'The expand icon.',
    type: 'React.Element',
    defaultValue: '<FormDown />'
  },
  'dataTable.primary.weight': {
    description: 'The font weight for primary cells.',
    type: 'string',
    defaultValue: 'bold'
  },
  'dataTable.resize.border.color': {
    description: 'The border color for resize.',
    type: 'string | { dark: string, light: string }',
    defaultValue: 'border'
  },
  'dataTable.resize.border.side': {
    description: 'The border side used for resize.',
    type: 'string',
    defaultValue: 'right'
  },
  'table.row.hover.background': {
    description: 'The background color when hovering over an interactive row.',
    type: 'string | { color: string, opacity: string }'
  },
  'table.row.hover.color': {
    description: 'The text color when hovering over an interactive row.',
    type: 'string | { dark: string, light: string }'
  }
};