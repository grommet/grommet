import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const docTableCell = (TableCell) => {
  const DocumentedTableCell = describe(TableCell)
    .description('A cell of data in a table.'
    ).usage(
      `import { TableCell } from 'grommet';
<TableCell />`
    );

  DocumentedTableCell.propTypes = {
    plain: PropTypes.bool
      .description('Whether default styling context should be removed.'),
    scope: PropTypes.oneOf(['col', 'row'])
      .description(`For header cells, what scope the header is for.
        Typically, the cells in a TableHeader have 'col' scope and
        the primary cell in each row in the TableBody has 'row' scope.`),
    size: PropTypes.oneOf(
      ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge',
        '1/2', '1/3', '2/3', '1/4', '3/4']
    ).description(`What size the cell should be. Typically, this is not needed
      unless you are trying to align multiple tables.`),
  };

  return DocumentedTableCell;
};

export const docTableRow = (TableRow) => {
  const DocumentedTableRow = describe(TableRow)
    .description('A row of cells in a table.'
    ).usage(
      `import { TableRow } from 'grommet';
<TableRow />`
    );

  return DocumentedTableRow;
};

export const docTableHeader = (TableHeader) => {
  const DocumentedTableHeader = describe(TableHeader)
    .description('The header of a table.'
    ).usage(
      `import { TableHeader } from 'grommet';
<TableHeader />`
    );

  return DocumentedTableHeader;
};

export const docTableBody = (TableBody) => {
  const DocumentedTableBody = describe(TableBody)
    .description('The body of a table.'
    ).usage(
      `import { TableBody } from 'grommet';
<TableBody />`
    );

  return DocumentedTableBody;
};

export const docTableFooter = (TableFooter) => {
  const DocumentedTableFooter = describe(TableFooter)
    .description('The footer of a table.'
    ).usage(
      `import { TableFooter } from 'grommet';
<TableFooter />`
    );

  return DocumentedTableFooter;
};

export default (Table) => {
  const DocumentedTable = describe(Table)
    .availableAt(getAvailableAtBadge('Table'))
    .description('A table of data organized in cells.'
    ).usage(
      `import { Table, TableHeader, TableFooter, TableBody, TableRow } from 'grommet';
<Table />`
    );

  DocumentedTable.propTypes = {
    caption: PropTypes.string.description('One line description.'),
  };

  return DocumentedTable;
};
