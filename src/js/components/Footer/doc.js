import { describe } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = Footer => {
  const DocumentedFooter = describe(Footer)
    .availableAt(getAvailableAtBadge('Footer'))
    .description('Footer for a document or section')
    .usage(
      `import { Footer } from 'grommet';
<Footer />`,
    );

  return DocumentedFooter;
};
