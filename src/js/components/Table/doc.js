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

export const themeDoc = {
  'table.extend': {
    description: 'Any additional style for Table.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'global.size': {
    description:
      'The size style that will impcat max-width and width of the table',
    defaultValue: `{
      xxsmall: '48px',
      xsmall: '96px',
      small: '192px',
      medium: '384px',
      large: '768px',
      xlarge: '1152px',
      xxlarge: '1536px',
      full: '100%',
      }`,
  },
};
