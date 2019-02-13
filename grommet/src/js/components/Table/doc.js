import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = Table => {
  const DocumentedTable = describe(Table)
    .availableAt(getAvailableAtBadge('Table'))
    .description('A table of data organized in cells.')
    .usage(
      `import { Table, TableHeader, TableFooter, TableBody, TableRow } from 'grommet';
<Table />`,
    )
    .intrinsicElement('table');

  DocumentedTable.propTypes = {
    ...genericProps,
    caption: PropTypes.string.description('One line description.'),
  };

  return DocumentedTable;
};
