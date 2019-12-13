import { describe } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = Footer => {
  const DocumentedFooter = describe(Footer)
    .availableAt(getAvailableAtBadge('Footer'))
    .description('is a Box container for a document or a section footer')
    .usage(
      `import { Footer } from 'grommet';
<Footer />`,
    );

  return DocumentedFooter;
};
