import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export default (DataTable) => {
  const DocumentedDataTable = describe(DataTable)
    .availableAt(getAvailableAtBadge('DataTable'))
    .description('A data driven table.')
      .usage(
        `import { DataTable } from 'grommet';
<DataTable />`
      );

  DocumentedDataTable.propTypes = {
    bodyProps: PropTypes.shape({})
      .description('Properties to pass to configure body cells.'),
    columns: PropTypes.arrayOf(PropTypes.shape({
      property: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func,
      align: PropTypes.oneOf(['center', 'start', 'end']),
      aggregate: PropTypes.oneOf(['avg', 'max', 'min', 'sum']),
      footer: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          aggregate: PropTypes.bool,
        }),
      ]),
      search: PropTypes.bool,
    }))
    .description(`
      A description of the data. The order controls the column order.
      'property' indicates which property in the data objects to associate
      the column with. 'label' indicates what to display in the column
      header. 'render' allows for custom rendering of body cells. Use 'render'
      for custom formatting for things like currency and date or to
      display rich content like Meters. 'align' indicates how the cells in
      the column are aligned. 'aggregate' indicates how the data in the
      column should be aggregated. This only applies to a footer or groupBy
      context. 'footer' indicates what should be shown in the footer for
      the column. 'search' indicates whether a search filter should be
      made available for the column.
    `),
    data: PropTypes.arrayOf(PropTypes.shape({}))
      .description('Array of data objects.'),
    footerProps: PropTypes.shape({})
      .description('Properties to pass to configure footer cells.'),
    groupBy: PropTypes.string
      .description('Property to group data by.'),
    headerProps: PropTypes.shape({})
      .description('Properties to pass to configure header cells.'),
    resizeable: PropTypes.string
      .description('Whether to allow the user to resize column widths.'),
    sortable: PropTypes.string
      .description('Whether to allow the user to sort columns.'),
  };

  return DocumentedDataTable;
};
