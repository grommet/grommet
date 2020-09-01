import { describe } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = Header => {
  const DocumentedHeader = describe(Header)
    .availableAt(getAvailableAtBadge('Header'))
    .description('Is a Box container for introductory content')
    .usage(
      `import { Header } from 'grommet';
<Header />`,
    );

  return DocumentedHeader;
};
