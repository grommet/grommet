import { describe, PropTypes } from 'react-desc';

import {
  colorPropType,
  getAvailableAtBadge,
  genericProps,
  themeDocUtils,
} from '../../utils';

export const doc = Paragraph => {
  const DocumentedParagraph = describe(Paragraph)
    .availableAt(getAvailableAtBadge('Paragraph'))
    .description('A paragraph of text.')
    .usage(
      `import { Paragraph } from 'grommet';
<Paragraph />`,
    )
    .intrinsicElement('p');

  DocumentedParagraph.propTypes = {
    ...genericProps,
    color: colorPropType.description(
      'A color identifier to use for the text color.',
    ),
    fill: PropTypes.bool
      .description('Whether the width should fill the container.')
      .defaultValue(false),
    responsive: PropTypes.bool
      .description(`Whether margin should be scaled for mobile environments.`)
      .defaultValue(true),
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
  paragraph: {
    description: `The possible sizes of the paragraph in terms of its max-width,
     font-size and line-height.`,
    type: 'object',
    defaultValue: `{
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
  ...themeDocUtils.edgeStyle('The possible sizes for margin.'),
};
