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
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ])
      .description('A fixed size.')
      .defaultValue('medium'),
    src: PropTypes.oneOfType([PropTypes.string]).description(
      `Specifies a URL string for an card image.`,
    ),
  };

  return DocumentedCard;
};

export const themeDoc = {
  'card.extend': {
    description: 'Any additional style for the Card.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'card.size.xsmall': {
    description: 'The xsmall size of the Card.',
    type: 'string',
    defaultValue: '18px',
  },
  'card.size.small': {
    description: 'The small size of the Card.',
    type: 'string',
    defaultValue: '24px',
  },
  'card.size.medium': {
    description: 'The medium size of the Card.',
    type: 'string',
    defaultValue: '48px',
  },
  'card.size.large': {
    description: 'The large size of the Card.',
    type: 'string',
    defaultValue: '72px',
  },
  'card.size.xlarge': {
    description: 'The xlarge size of the Card.',
    type: 'string',
    defaultValue: '96px',
  },
  'card.text.extend': {
    description: 'Any additional style for the text.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'card.text.fontWeight': {
    description: 'The font weight of the label.',
    type: 'number',
    defaultValue: undefined,
  },
};
