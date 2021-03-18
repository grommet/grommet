import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = SidebarLayout => {
  const DocumentedSidebarLayout = describe(SidebarLayout)
    .availableAt(getAvailableAtBadge('SidebarLayout', 'Layout'))
    .description('Various layouts including a Sidebar.')
    .usage(
      `import { SidebarLayout } from 'grommet';
<SidebarLayout sidebar={<Sidebar />} />`,
    )
    .intrinsicElement('div');

  DocumentedSidebarLayout.propTypes = {
    sidebar: PropTypes.node.description(`
      A sidebar element. Use 'SidebarLayout.SidebarToggleButton'
      to control whether the sidebar is shown in small responsive contexts.
      Use 'SidebarLayout.SidebarCloseButton' to close the sidebar in small
      responsive contexts.
      `),
  };

  return DocumentedSidebarLayout;
};
