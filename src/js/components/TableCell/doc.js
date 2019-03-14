import { describe, PropTypes } from 'react-desc';

export const doc = TableCell => {
  const DocumentedTableCell = describe(TableCell)
    .description('A cell of data in a table.')
    .usage(
      `import { TableCell } from 'grommet';
<TableCell />`,
    )
    .intrinsicElement('td');

  DocumentedTableCell.propTypes = {
    plain: PropTypes.bool
      .description('Whether default styling context should be removed.')
      .defaultValue(false),
    scope: PropTypes.oneOf(['col', 'row'])
      .description(`For header cells, what scope the header is for.
        Typically, the cells in a TableHeader have 'col' scope and
        the primary cell in each row in the TableBody has 'row' scope.`),
    size: PropTypes.oneOfType([
      PropTypes.oneOf([
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        '1/2',
        '1/3',
        '2/3',
        '1/4',
        '2/4',
        '3/4',
      ]),
      PropTypes.string,
    ]).description(`What size the cell should be. Typically, this is not needed
      unless you are trying to align multiple tables.`),
    verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']).description(
      'How to align the contents vertically.',
    ),
  };

  return DocumentedTableCell;
};

export const themeDoc = {
  'table.body.align': {
    description: '',
    type: '',
    defaultValue: 'start',
  },
  'table.body.border': {
    description: '',
    type: '',
    defaultValue: undefined,
  },
  'table.body.extend': {
    description: '',
    type: '',
    defaultValue: undefined,
  },
  'table.body.pad': {
    description: '',
    type: '',
    defaultValue: '{ horizontal: small, vertical: xsmall }',
  },
  'table.footer.align': {
    description: 'start',
    type: '',
    defaultValue: undefined,
  },
  'table.footer.border': {
    description: '',
    type: '',
    defaultValue: 'top',
  },
  'table.footer.extend': {
    description: '',
    type: '',
    defaultValue: undefined,
  },
  'table.footer.fill': {
    description: '',
    type: '',
    defaultValue: 'vertical',
  },
  'table.footer.pad': {
    description: '',
    type: '',
    defaultValue: '{ horizontal: small, vertical: xsmall }',
  },
  'table.footer.verticalAlign': {
    description: 'How to align the contents vertically.',
    type: '',
    defaultValue: 'top',
  },
  'table.header.align': {
    description: '',
    type: '',
    defaultValue: 'start',
  },
  'table.header.background': {
    description: '',
    type: '',
    defaultValue: undefined,
  },
  'table.header.border': {
    description: '',
    type: '',
    defaultValue: 'bottom',
  },
  'table.header.fill': {
    description: '',
    type: '',
    defaultValue: 'vertical',
  },
  'table.header.extend': {
    description: '',
    type: '',
    defaultValue: undefined,
  },
  'table.header.pad': {
    description: '',
    type: '',
    defaultValue: '{ horizontal: small, vertical: xsmall }',
  },
  'table.header.verticalAlign': {
    description: '',
    type: '',
    defaultValue: 'bottom',
  },
};
