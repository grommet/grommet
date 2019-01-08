import { describe, PropTypes } from 'react-desc';

export const doc = TableRow => {
  const DocumentedTableRow = describe(TableRow)
    .description('A row of cells in a table.')
    .usage(
      `import { TableRow } from 'grommet';
<TableRow />`,
    )
    .intrinsicElement('tr');

    DocumentedTableRow.propTypes = {
      hoverIndicator: PropTypes.bool
        .description(
          'Whether to apply the hover indicator when the user is mousing over row.'
        )
        .defaultValue(false),
    }

  return DocumentedTableRow;
};
