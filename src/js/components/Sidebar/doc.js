import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = Sidebar => {
  const DocumentedSidebar = describe(Sidebar)
    .availableAt(getAvailableAtBadge('Sidebar', 'Layout'))
    .description('A sidebar, typically used with Nav children.')
    .usage(
      `import { Sidebar } from 'grommet';
<Sidebar/>`,
    )
    .intrinsicElement('div');

  DocumentedSidebar.propTypes = {
    footer: PropTypes.node.description(
      'If specified, a footer element for the Sidebar',
    ),
    header: PropTypes.node.description(
      'If specified, an header element for the Sidebar',
    ),
  };

  return DocumentedSidebar;
};
