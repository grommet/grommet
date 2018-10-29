import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = DataTable => {
  const DocumentedDataTable = describe(DataTable)
    .availableAt(getAvailableAtBadge('DataTable'))
    .description('A data driven table.')
    .usage(
      `import { DataTable } from 'grommet';
<DataTable />`,
    );

  DocumentedDataTable.propTypes = {
    ...genericProps,
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
        property: PropTypes.string.isRequired,
        render: PropTypes.func,
        search: PropTypes.bool,
      }),
    ).description(`
      A description of the data. The order controls the column order.
      'property' indicates which property in the data objects to associate
      the column with. 'header' indicates what to display in the column
      header. 'render' allows for custom rendering of body cells. Use 'render'
      for custom formatting for things like currency and date or to
      display rich content like Meters. 'align' indicates how the cells in
      the column are aligned. 'aggregate' indicates how the data in the
      column should be aggregated. This only applies to a footer or groupBy
      context. 'footer' indicates what should be shown in the footer for
      the column. 'search' indicates whether a search filter should be
      made available for the column.
    `),
    data: PropTypes.arrayOf(PropTypes.shape({})).description(
      'Array of data objects.',
    ),
    groupBy: PropTypes.string.description('Property to group data by.'),
    onMore: PropTypes.func.description(
      `Use this to indicate that 'data' doesn't contain all that it could.
      It will be called when all of the data rows have been rendered.
      This might be used when the total number of items that could be retrieved
      is more than you'd want to load into the browser. 'onMore' allows you
      to lazily fetch more from the server only when needed. This cannot
      be combined with properties that expect all data to be present in the
      browser, such as columns.search, sortable, groupBy, or columns.aggregate.`,
    ),
    onSearch: PropTypes.func.description(
      `When supplied, and when at least one column has 'search' enabled,
      this function will be called with an object with keys for property
      names and values which are the search text strings. This is typically
      employed so a back-end can be used to search through the data.`,
    ),
    resizeable: PropTypes.bool.description(
      'Whether to allow the user to resize column widths.',
    ),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]).description(`
      The height of the table body. If set, the table body will have a fixed
      height and the rows will be scrollable within it. In order to preserve
      header and footer cell alignment, all cells will have the same
      width. This cannot be used in combination with 'resizeable'.
    `),
    sortable: PropTypes.bool.description(
      'Whether to allow the user to sort columns.',
    ),
  };

  return DocumentedDataTable;
};
