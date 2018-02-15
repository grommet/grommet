import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export default (Table) => {
  const DocumentedTable = describe(Table)
    .availableAt(getAvailableAtBadge('Table'))
    .description('A table of data organized in cells.'
    ).usage(
      `import { Table, TableCell } from 'grommet';
<Table />`
    );

  DocumentedTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      header: PropTypes.node,
      label: PropTypes.string,
      property: PropTypes.string,
      renderData: PropTypes.func,
    }))
      .description(`Description of the table columns. Either label or header
        must be specified. Either property or renderData must be specified. If
        property is specified, a TableCell containing the datum property value
        will be rendered in Text. It is recommended to use TableCell for
        header and in renderData.`)
      .isRequired,
    data: PropTypes.arrayOf(PropTypes.object)
      .description(`Data objects to populate the table with. Each object in
        the array will be placed in a separate row. Properties of each object
        are rendered according to how columns are defined.`),
  };

  return DocumentedTable;
};
