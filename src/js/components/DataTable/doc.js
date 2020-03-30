import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

const sizes = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
const sides = ['horizontal', 'vertical', 'top', 'bottom', 'left', 'right'];
const parts = ['header', 'body', 'footer'];

const padShapeSides = {};
sides.forEach(side => {
  padShapeSides[side] = PropTypes.oneOf(sizes);
});

const padShapeParts = {};
parts.forEach(part => {
  padShapeParts[part] = {};
  sides.forEach(side => {
    padShapeParts[part][side] = PropTypes.oneOf(sizes);
  });
});

const backgroundShape = {};
parts.forEach(part => {
  backgroundShape[part] = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]);
});

const borderTypes = [
  PropTypes.bool,
  PropTypes.oneOf(sides),
  PropTypes.shape({
    color: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        dark: PropTypes.string,
        light: PropTypes.string,
      }),
    ]),
    side: PropTypes.oneOf(sides),
    size: PropTypes.oneOfType([PropTypes.oneOf(sizes), PropTypes.string]),
  }),
];

const borderShape = {};
parts.forEach(part => {
  borderShape[part] = PropTypes.oneOfType(borderTypes);
});

export const doc = DataTable => {
  const DocumentedDataTable = describe(DataTable)
    .availableAt(getAvailableAtBadge('DataTable'))
    .description('A data driven table.')
    .usage(
      `import { DataTable } from 'grommet';
<DataTable />`,
    )
    .intrinsicElement('table');

  DocumentedDataTable.propTypes = {
    ...genericProps,
    background: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.shape(backgroundShape),
    ]).description(
      `Cell background. You can set the background per context by passing an
      object with keys for 'heading', 'body', and/or 'footer'. If you pass
      an array, rows will cycle between the array values.`,
    ),
    border: PropTypes.oneOfType([
      ...borderTypes,
      PropTypes.shape(borderShape),
    ]).description(
      `Cell border. You can set the border per context by passing an
      object with keys for 'heading', 'body', and/or 'footer'.`,
    ),
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        align: PropTypes.oneOf(['center', 'start', 'end']),
        aggregate: PropTypes.oneOf(['avg', 'max', 'min', 'sum']),
        footer: PropTypes.oneOfType([
          PropTypes.node,
          PropTypes.shape({
            aggregate: PropTypes.bool,
          }),
        ]),
        header: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.node,
          PropTypes.shape({
            aggregate: PropTypes.bool,
          }),
        ]),
        primary: PropTypes.bool,
        property: PropTypes.string.isRequired,
        render: PropTypes.func,
        search: PropTypes.bool,
        sortable: PropTypes.bool,
        verticalAlign: PropTypes.oneOf(['middle', 'top', 'bottom']),
      }),
    ).description(
      `A description of the data. The order controls the column order.
      'property' indicates which property in the data objects to associate
      the column with. 'header' indicates what to display in the column
      header. 'render' allows for custom rendering of body cells. Use 'render'
      for custom formatting for things like currency and date or to
      display rich content like Meters. 'align' indicates how the cells in
      the column are aligned. 'aggregate' indicates how the data in the
      column should be aggregated. This only applies to a footer or groupBy
      context. 'footer' indicates what should be shown in the footer for
      the column. 'search' indicates whether a search filter should be
      made available for the column. 'primary' indicates that this property
      should be used as the unique identifier, which gives the cell 'row' scope
      for accessibility. If 'primary' is not used for any column, and
      'primaryKey' isn't specified either, then the first column will be used.`,
    ),
    data: PropTypes.arrayOf(PropTypes.shape({})).description(
      'Array of data objects.',
    ),
    groupBy: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        property: PropTypes.string,
        expand: PropTypes.arrayOf(PropTypes.string),
        onExpand: PropTypes.func,
      }),
    ]).description(`Property to group data by. If object is specified
      'property' is used to group data by, 'expand' accepts array of 
       group keys that sets expanded groups and 'onExpand' is a function
       that will be called after expand button is clicked with
       an array of keys of expanded groups.`),
    onMore: PropTypes.func.description(
      `Use this to indicate that 'data' doesn't contain all that it could.
      It will be called when all of the data rows have been rendered.
      This might be used when the total number of items that could be retrieved
      is more than you'd want to load into the browser. 'onMore' allows you
      to lazily fetch more from the server only when needed. This cannot
      be combined with properties that expect all data to be present in the
      browser, such as columns.search, sortable, groupBy, or 
      columns.aggregate.`,
    ),
    replace: PropTypes.bool.description(
      `Whether to replace previously rendered items with a generic spacing
      element when they have scrolled out of view. This is more performant but
      means that in-page searching will not find elements that have been
      replaced.`,
    ),
    onClickRow: PropTypes.func.description(
      `When supplied, this function will be called with an event object that
      include a 'datum' property containing the data value associated with
      the clicked row. You should not include interactive elements, like
      Anchor or Button inside table cells as that can cause confusion with
      overlapping interactive elements.`,
    ),
    onSearch: PropTypes.func.description(
      `When supplied, and when at least one column has 'search' enabled,
      this function will be called with an object with keys for property
      names and values which are the search text strings. This is typically
      employed so a back-end can be used to search through the data.`,
    ),
    onSort: PropTypes.func.description(
      `When supplied, this function will be called with an object
      with a 'property' property that indicates which property
      is being sorted on and a 'direction' property that will either be
      'asc' or 'desc'. onSort={({ property, direction }) => {}}`,
    ),
    pad: PropTypes.oneOfType([
      PropTypes.oneOf(sizes),
      PropTypes.string,
      PropTypes.shape(padShapeSides),
      PropTypes.shape(padShapeParts),
    ]).description(
      `Cell padding. You can set the padding per context by passing an
      object with keys for 'heading', 'body', and/or 'footer'.`,
    ),
    primaryKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]).description(
      `When supplied, indicates the property for a data object to use to
      get a unique identifier. See also the 'columns.primary' description.
      Use this property when the columns approach will not work for your
      data set. Setting primaryKey to false indicates there should be no
      unique identifier, avoid this as it's less accessible.`,
    ),
    resizeable: PropTypes.bool.description(
      'Whether to allow the user to resize column widths.',
    ),
    rowProps: PropTypes.shape({}).description(
      `Row specific background, border, and pad, keyed by primary key value.
      For example:
      { "primary-key-value": { background: ..., border: ..., pad: ... }},
      where the background, border, and pad accept the same values as
      the same named properties on DataTable.`,
    ),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]).description(
      `The height of the table body. If set, the table body will have a fixed
      height and the rows will be scrollable within it. In order to preserve
      header and footer cell alignment, all cells will have the same
      width. This cannot be used in combination with 'resizeable'.`,
    ),
    sort: PropTypes.shape({
      direction: PropTypes.oneOf(['asc', 'desc']),
      property: PropTypes.string.isRequired,
    }).description('Which property to sort on and which direction to sort.'),
    sortable: PropTypes.bool.description(
      'Whether to allow the user to sort columns.',
    ),
    step: PropTypes.number
      .description('How many items to render at a time.')
      .defaultValue(50),
  };

  return DocumentedDataTable;
};

export const themeDoc = {
  'global.hover.background': {
    description: 'The background style when hovering over an interactive row.',
    type: 'string | { color: string, opacity: string }',
    defaultValue: "{ color: 'active', opacity: 'medium' }",
  },
  'global.hover.color': {
    description: 'The text color when hovering over an interactive row.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: 'white', light: 'black' }",
  },
  'dataTable.groupHeader.background': {
    description: 'The background color of the group header.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: 'dark-2', light: 'light-2' }",
  },
  'dataTable.groupHeader.border.side': {
    description: 'The border side rendered for the group header.',
    type: 'string',
    defaultValue: 'bottom',
  },
  'dataTable.groupHeader.border.size': {
    description: 'The border size of the group header border.',
    type: 'string',
    defaultValue: 'xsmall',
  },
  'dataTable.groupHeader.fill': {
    description: 'Whether the height should fill the group header.',
    type: 'string',
    defaultValue: 'vertical',
  },
  'dataTable.groupHeader.pad': {
    description: 'The pad used for the group header.',
    type: 'string | object',
    defaultValue: "{ horizontal: 'small', vertical: 'xsmall' }",
  },
  'dataTable.header': {
    description: 'Styles for the header.',
    type: 'object',
    defaultValue: '{}',
  },
  'dataTable.icons.ascending': {
    description: 'The ascending icon.',
    type: 'React.Element',
    defaultValue: '<FormDown />',
  },
  'dataTable.icons.contract': {
    description: 'The contract icon.',
    type: 'React.Element',
    defaultValue: '<FormUp />',
  },
  'dataTable.icons.descending': {
    description: 'The descending icon.',
    type: 'React.Element',
    defaultValue: '<FormUp />',
  },
  'dataTable.icons.expand': {
    description: 'The expand icon.',
    type: 'React.Element',
    defaultValue: '<FormDown />',
  },
  'dataTable.primary.weight': {
    description: 'The font weight for primary cells.',
    type: 'string',
    defaultValue: 'bold',
  },
  'dataTable.resize.border.color': {
    description: 'The border color for resize.',
    type: 'string | { dark: string, light: string }',
    defaultValue: 'border',
  },
  'dataTable.resize.border.side': {
    description: 'The border side used for resize.',
    type: 'string',
    defaultValue: 'right',
  },
  'table.row.hover.background': {
    description: 'The background color when hovering over an interactive row.',
    type: 'string | { color: string, opacity: string }',
  },
  'table.row.hover.color': {
    description: 'The text color when hovering over an interactive row.',
    type: 'string | { dark: string, light: string }',
  },
};
