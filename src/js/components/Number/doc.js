import { describe, PropTypes } from 'react-desc';

import { colorPropType } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = Number => {
  const DocumentedNumber = describe(Number)
    .availableAt(getAvailableAtBadge('Number', 'Visualizations'))
    .description('Is a number value with optional units')
    .usage(
      `import { Number } from 'grommet';
<Number value={27} units="GB" />`,
    );

  DocumentedNumber.propTypes = {
    color: colorPropType.description(
      'A color identifier to use for the text color.',
    ),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ])
      .description('The size of the text.')
      .defaultValue('medium'),
    units: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        color: colorPropType.description(
          'A color identifier to use for the units.',
        ),
        label: PropTypes.string.description('The label for the units.'),
        size: PropTypes.oneOfType([
          PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
          PropTypes.string,
        ]).description('The size of the units.'),
        weight: PropTypes.oneOfType([
          PropTypes.oneOf(['normal', 'bold']),
          PropTypes.number,
        ]).description('The font weight of the units'),
      }),
    ]).description('Whether and how any units should be shown.'),
    weight: PropTypes.oneOfType([
      PropTypes.oneOf(['normal', 'bold']),
      PropTypes.number,
    ]).description('The font weight of the text'),
  };

  return DocumentedNumber;
};

export const themeDoc = {
  'global.colors.text': {
    description: `The text color used for Number. In order for this to take 
    effect, global.colors.background needs to be defined.`,
    type: 'object | { dark: string, light: string }',
    defaultValue: "{ dark: '#f8f8f8', light: '#444444' }",
  },
  'text.font.family': {
    description: 'The font family to use for Number.',
    type: 'string',
    defaultValue: undefined,
  },
  'number.size': {
    description: `The possible sizes of the text in terms of its font-size and 
line-height.`,
    type: 'object',
    defaultValue: `{
      small: {
        size: '26px',
        height: '32px',
       },
      medium: {
        size: '34px',
        height: '40px',
      },
      large: {
        size: '50px',
        height: '56px',
      },
      xlarge: {
        size: '82px',
        height: '88px',
      },
    }`,
  },
  'number.weight': {
    description: 'The font weight',
    type: 'string',
    defaultValue: 'bold',
  },
  'number.color': {
    description: 'The text color',
    type: 'string',
    defaultValue: undefined,
  },
  'number.units.size': {
    description: `The possible sizes of the units text, either using t-shirt
    size terms or { size, height } objects.`,
    type: 'object',
    defaultValue: undefined,
  },
  'number.units.weight': {
    description: `The font weight of the units text.`,
    type: 'string',
    defaultValue: undefined,
  },
  'number.units.color': {
    description: `The color of the units text.`,
    type: 'string',
    defaultValue: undefined,
  },
};
