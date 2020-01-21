import { describe } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = Nav => {
  const DocumentedNav = describe(Nav)
    .availableAt(getAvailableAtBadge('Nav'))
    .description('Is a Box container for navigation links')
    .usage(
      `import { Nav } from 'grommet';
<Nav />`,
    );

  return DocumentedNav;
};
