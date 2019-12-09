import { describe } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = Main => {
  const DocumentedMain = describe(Main)
    .availableAt(getAvailableAtBadge('Main'))
    .description('main content of a document.')
    .usage(
      `import { Main } from 'grommet';
<Main />`,
    );

  return DocumentedMain;
};
