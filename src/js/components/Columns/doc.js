import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = Columns => {
  const DocumentedColumns = describe(Columns)
    .availableAt(getAvailableAtBadge('Columns', 'Layout'))
    .description('Typical variations on responsive multiple column layouts.')
    .usage(
      `import { Columns } from 'grommet';
<Columns />`,
    )
    .intrinsicElement('div');

  DocumentedColumns.propTypes = {
    aside: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]).description('Maximum width of the last child.'),
    center: PropTypes.bool
      .description(
        `
      Whether to center the Columns component.
    `,
      )
      .defaultValue(true),
    gutter: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]).description(`
      Minimum vertical gutters when 'center' is true.
      `),
    sidebar: PropTypes.node.description(`
      If specified, a sidebar element. Use 'Columns.SidebarToggleButton'
      to control whether the sidebar is shown in small responsive contexts.
      Use 'Columns.SidebarCloseButton' to close the sidebar in small
      responsive contexts.
      `),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]).description(`
      The uniform minimum width of columns. Children will wrap as needed.
    `),
    width: PropTypes.shape({
      max: PropTypes.oneOfType([
        PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
        PropTypes.string,
      ]),
    }).description(`Maximum width of the content when 'center' is true.`),
  };

  return DocumentedColumns;
};
