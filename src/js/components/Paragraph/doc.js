import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge, genericProps } from '../../utils';

export const doc = Paragraph => {
  const DocumentedParagraph = describe(Paragraph)
    .availableAt(getAvailableAtBadge('Paragraph'))
    .description('A paragraph of text.')
    .usage(
      `import { Paragraph } from 'grommet';
<Paragraph />`,
    );

  DocumentedParagraph.propTypes = {
    ...genericProps,
    color: PropTypes.string.description(
      'A color identifier to use for the text color.',
    ),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'xxlarge']),
      PropTypes.string,
    ])
      .description('The size of the Paragraph text.')
      .defaultValue('medium'),
    textAlign: PropTypes.oneOf(['start', 'center', 'end'])
      .description('How to align the text inside the paragraph.')
      .defaultValue('start'),
  };

  return DocumentedParagraph;
};

export const themeDoc = {
  'global.colors.text': {
    description: 'The text color used inside the Paragraph.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: '#f8f8f8', light: '#444444' }",
  },
  'global.text': {
    description: 'The text size of the Paragraph text.',
    type: 'string',
    defaultValue: 'medium',
  },
  'paragraph.extend': {
    description: 'Any additional style for the Paragraph.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
};
