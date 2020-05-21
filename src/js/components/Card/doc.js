import { describe, PropTypes } from 'react-desc';

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

  DocumentedCard.propTypes = {
    footer: PropTypes.node.description(
      'If specified, a footer element for the Card',
    ),
    header: PropTypes.node.description(
      'If specified, an header element for the Card',
    ),
  };

  return DocumentedCard;
};

export const themeDoc = {
  card: {
    description: 'Any valid Box prop for the Card container.',
    type: 'object',
    defaultValue: undefined,
  },
  'card.background': {
    description: 'The background color for the Card container.',
    type: 'string | object',
    defaultValue: 'white',
  },
  'card.elevation': {
    description: 'The elevation of the Card container.',
    type: 'string',
    defaultValue: 'small',
  },
  'card.gap': {
    description: 'The spacing between the Card elements.',
    type: 'string',
    defaultValue: 'medium',
  },
  'card.round': {
    description: 'The border radius for the Card corners.',
    type: 'string',
    defaultValue: 'small',
  },
  'card.header': {
    description: 'Any valid Box prop for the Card header.',
    type: 'object',
    defaultValue: undefined,
  },
  'card.header.background': {
    description: 'The background color for the Card header.',
    type: 'string | object',
    defaultValue: 'background-front',
  },
  'card.header.pad': {
    description: 'The padding for the Card header.',
    type: 'object',
    defaultValue: 'small',
  },
  'card.content': {
    description: 'Any valid Box prop for the Card children.',
    type: 'object',
    defaultValue: undefined,
  },
  'card.content.pad': {
    description: 'The padding for the Card content.',
    type: 'object',
    defaultValue: 'small',
  },
  'card.footer': {
    description: 'Any valid Box prop for the Card footer.',
    type: 'object',
    defaultValue: undefined,
  },
  'card.footer.background': {
    description: 'The background color for the Card footer.',
    type: 'string | object',
    defaultValue: 'background-front',
  },
  'card.footer.pad': {
    description: 'The padding for the Card footer.',
    type: 'object',
    defaultValue: 'small',
  },
};
