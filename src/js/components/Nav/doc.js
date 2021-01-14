import { describe } from 'react-desc';

import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = Nav => {
  const DocumentedNav = describe(Nav)
    .availableAt(getAvailableAtBadge('Nav', 'Controls'))
    .description('Is a Box container for navigation links')
    .usage(
      `import { Nav } from 'grommet';
<Nav />`,
    );

  return DocumentedNav;
};
