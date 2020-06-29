import { describe } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = Card => {
  const DocumentedCard = describe(Card)
    .availableAt(getAvailableAtBadge('Card'))
    .description('A Card.')
    .usage(
      `import { Card } from 'grommet';
<Card/>`,
    )
    .intrinsicElement('div');

  return DocumentedCard;
};

export const themeDoc = {
  'card.container': {
    description: 'Any valid Box prop for the Card container.',
    type: 'object',
    defaultValue: undefined,
  },
  'card.header': {
    description: 'Any valid Box prop for the CardHeader.',
    type: 'object',
    defaultValue: undefined,
  },
  'card.body': {
    description: 'Any valid Box prop for the CardBody.',
    type: 'object',
    defaultValue: undefined,
  },
  'card.footer': {
    description: 'Any valid Box prop for the CardFooter container.',
    type: 'object',
    defaultValue: undefined,
  },
};
