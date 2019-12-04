import { describe } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = Header => {
  const DocumentedHeader = describe(Header)
    .availableAt(getAvailableAtBadge('Header'))
    .description('Is a Box container for introductory content')
    .usage(
      `import { Header } from 'grommet';
<Header />`,
    );

  DocumentedHeader.propTypes = {
    ...genericProps,
  };

  return DocumentedHeader;
};

export const themeDoc = {};
