import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = Nav => {
  const DocumentedNav = describe(Nav)
    .availableAt(getAvailableAtBadge('Nav'))
    .description('Is a Box container for navigation links')
    .usage(
      `import { Nav } from 'grommet';
<Nav />`,
    );

  DocumentedNav.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).description(
      `Navigation items to be placed inside the Nav.
The object values are 'label' for the Anchor label and 'href' for its link.`,
    ),
  };
  return DocumentedNav;
};
