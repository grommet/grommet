import { describe, PropTypes } from 'react-desc';

import {
  colorPropType,
  genericProps,
  getAvailableAtBadge,
  themeDocUtils,
} from '../../utils';

export const doc = Heading => {
  const DocumentedHeading = describe(Heading)
    .availableAt(getAvailableAtBadge('Heading'))
    .description('Heading text structured in levels.')
    .usage(
      `import { Heading } from 'grommet';
<Heading />`,
    )
    .intrinsicElement(['h1', 'h2', 'h3', 'h4']);

  DocumentedHeading.propTypes = {
    ...genericProps,
    color: colorPropType.description(
      'A color identifier to use for the text color.',
    ),
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6'])
      .description(
        `The heading level. It corresponds to the number after the 'H' for
the DOM tag. Set the level for semantic accuracy and accessibility.
The sizing can be further adjusted using the size property.`,
      )
      .defaultValue(1),
    responsive: PropTypes.bool
      .description(
        `Whether the font size should be scaled for
      mobile environments.`,
      )
      .defaultValue(true),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ])
      .description(
        `The font size is primarily driven by the chosen tag. But, it can
be adjusted via this size property. The tag should be set for semantic
correctness and accessibility. This size property allows for stylistic
adjustments.`,
      )
      .defaultValue('medium'),
    textAlign: PropTypes.oneOf(['start', 'center', 'end'])
      .description('How to align the text inside the heading.')
      .defaultValue('start'),
    truncate: PropTypes.bool
      .description(
        `Restrict the text to a single line and truncate with ellipsis if it
is too long to all fit.`,
      )
      .defaultValue(false),
  };

  return DocumentedHeading;
};

export const themeDoc = {
  ...themeDocUtils.breakpointStyle(
    'The possible breakpoints that could affect font-size and max-width',
  ),
  ...themeDocUtils.edgeStyle('The possible sizes for margin.'),
  'heading.extend': {
    description: 'Any additional style for Heading.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'heading.level': {
    description: `The level that impacts line-height, max-width, font size, 
weight and family of the Heading. Heading level is automatically adjusted at 
different screen sizes. These screen sizes are derived from breakpoints.`,
    type: 'object',
    defaultValue: `
      1: {
        medium: {
          size: 34px,
          height: 40px,
          width: 826px,
        },
      },
      weight: 600,
      font:
        {
          family: undefined,
        }`,
  },
  'heading.weight': {
    description:
      'Default heading weight used unless a per level heading is defined.',
    type: 'number',
    defaultValue: 600,
  },
  'heading.font': {
    description:
      'Default heading font used unless a per level heading is defined.',
    type: 'object',
    defaultValue: undefined,
  },
  'heading.responsiveBreakpoint': {
    description: `The breakpoint to trigger changes in the Heading layout. 
The actual values will be derived from global.breakpoints.`,
    type: 'string',
    defaultValue: 'small',
  },
};
