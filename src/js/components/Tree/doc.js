import { describe } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = Tree => {
  const DocumentedTree = describe(Tree)
    .availableAt(getAvailableAtBadge('Tree'))
    .description('A tree.')
    .usage(
      `import { Tree } from 'grommet';
<Tree />`,
    );

  return DocumentedTree;
};

export const themeDoc = {};
