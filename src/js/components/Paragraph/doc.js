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
  'global.edgeSize.small': {
    description: 'The padding around paragraph.',
    type: 'string',
    defaultValue: '12px',
  },
  'global.edgeSize': {
    description: 'The possible sizes for gap, margin, and pad.',
    type: 'object',
    defaultValue: `{
  edgeSize: {
    none: '0px',
    hair: '1px',
    xxsmall: '3px',
    xsmall: '6px',
    small: '12px',
    medium: '24px',
    large: '48px',
    xlarge: '96px',
    responsiveBreakpoint: 'small',
  },
}`,
  },
  'paragraph.maxWidth': {
    description: `The maximum width.`,
    type: 'string',
    defaultValue: '',
  },
  'paragraph.size': {
    description: `The font size of the paragraph text.`,
    type: 'string',
    defaultValue: '',
  },
  'paragraph.height': {
    description: `The line height in the paragraph.`,
    type: 'string',
    defaultValue: '',
  },
  'paragraph.textAlign': {
    description: `How to align the text inside the Paragraph.`,
    type: 'string',
    defaultValue: 'start',
  },
  'paragraph.extend': {
    description: 'Any additional style for the Paragraph.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
};
