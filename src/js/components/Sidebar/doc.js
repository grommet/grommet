import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = Sidebar => {
  const DocumentedSidebar = describe(Sidebar)
    .availableAt(getAvailableAtBadge('Sidebar'))
    .description('An Sidebar.')
    .usage(
      `import { Sidebar } from 'grommet';
<Sidebar/>`,
    )
    .intrinsicElement('div');

  DocumentedSidebar.propTypes = {
    footer: PropTypes.node.description(
      'If specified, a footer component for the Sidebar',
    ),
    header: PropTypes.node.description(
      'If specified, an header component for the Sidebar',
    ),
  };

  return DocumentedSidebar;
};
