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
  'global.edgeSize': {
    description: 'The possible sizes for margin.',
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
  paragraph: {
    description: `The maximum width, font-size and line height of the paragraph.`,
    type: 'string',
    defaultValue: `{
      size: { 
        small: {
          size: '14px',
          height: '20px',
          maxWidth: '336px',
        },
        medium: {
          size: '18px',
          height: '24px',
          maxWidth: '432px',
        },
        large: {
          size: '22px',
          height: '28px',
          maxWidth: '528px',
        },
        xlarge: {
          size: '26px',
          height: '32px',
          maxWidth: '624px',
        },
        xxlarge: {
          size: '34px',
          height: '40px',
          maxWidth: '816px',
        },
      },
    }`,
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
