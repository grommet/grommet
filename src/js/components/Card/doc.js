import { describe } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = Card => {
  const DocumentedCard = describe(Card)
    .availableAt(getAvailableAtBadge('Card'))
    .description('A card.')
    .usage(
      `import { Card } from 'grommet';
<Card />`,
    );

  return DocumentedCard;
};

export const themeDoc = {};
