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
    caption: PropTypes.string.description('One line summary'),
    columns: PropTypes.arrayOf(PropTypes.shape({
      basis: PropTypes.oneOf(
        ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge',
          '1/2', '1/3', '2/3', '1/4', '3/4']
      ),
      dataHeader: PropTypes.bool,
      footer: PropTypes.node,
      header: PropTypes.node,
      label: PropTypes.string,
      property: PropTypes.string,
      renderData: PropTypes.func,
    }))
      .description(`Description of the table columns. Either property or
        renderData must be specified. If property is specified, a TableCell
        containing the datum property value will be rendered in Text. It is
        recommended to use TableCell for header, footer, and in renderData.`)
      .isRequired,
    data: PropTypes.arrayOf(PropTypes.object)
      .description(`Data objects to populate the table with. Each object in
        the array will be placed in a separate row. Properties of each object
        are rendered according to how columns are defined.`),
  };

  return DocumentedTable;
};
