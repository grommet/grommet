import { describe } from 'react-desc';

import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = Main => {
  const DocumentedMain = describe(Main)
    .availableAt(getAvailableAtBadge('Main', 'Layout'))
    .description('main content of a document.')
    .usage(
      `import { Main } from 'grommet';
<Main />`,
    );

  return DocumentedMain;
};
