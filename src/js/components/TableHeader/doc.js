import { describe } from 'react-desc';

export const doc = TableHeader => {
  const DocumentedTableHeader = describe(TableHeader)
    .description('The header of a table.')
    .usage(
      `import { TableHeader } from 'mnet-ui-base';
<TableHeader />`,
    )
    .intrinsicElement('thead');

  return DocumentedTableHeader;
};
