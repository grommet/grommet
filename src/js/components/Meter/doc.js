import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = Meter => {
  const DocumentedMeter = describe(Meter)
    .availableAt(getAvailableAtBadge('Meter'))
    .description('A graphical meter.')
    .usage(
      `import { Meter } from 'grommet';
<Meter />`,
    );
  // We don't include svg due to a collision on the values property
  // .intrinsicElement('svg');

  DocumentedMeter.propTypes = {
    ...genericProps,
    background: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        color: PropTypes.string,
        opacity: PropTypes.oneOfType([
          PropTypes.oneOf(['weak', 'medium', 'strong']),
          PropTypes.number,
          PropTypes.bool,
        ]),
      }),
    ])
      .description('Background color')
      .defaultValue({
        color: 'light-2',
        opacity: 'medium',
      }),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).description(
      'The maximum value for the Meter.',
    ),
    round: PropTypes.bool
      .description('Whether to round the line ends')
      .defaultValue(false),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full']),
      PropTypes.string,
    ])
      .description('The size of the Meter.')
      .defaultValue('medium'),
    thickness: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ])
      .description('The size of the Meter.')
      .defaultValue('medium'),
    type: PropTypes.oneOf(['bar', 'circle'])
      .description('The visual type of meter.')
      .defaultValue('bar'),
    values: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        highlight: PropTypes.bool,
        label: PropTypes.string.isRequired, // for accessibility
        onClick: PropTypes.func,
        onHover: PropTypes.func,
        value: PropTypes.number.isRequired,
      }),
    ).description(
      `Array of value objects describing the data.
      'value' is the actual numeric value.
      'label' is a text string describing it.
      'color' indicates the color name to use. If not specified a default one
      will be chosen.
      'onClick' will be called when the user clicks on it.
      Set 'highlight' to call attention to it.
      'onHover' will be called with a boolean argument indicating when the
      user hovers onto or away from it.`,
    ),
  };

  return DocumentedMeter;
};

export const themeDoc = {
  'global.colors': {
    description: 'Color options.',
    type: 'object',
    defaultValue: `{
      "accent-1": "#6FFFB0",
      "graph-0": "accent-1",
      ...
    }`,
  },
  'global.edgeSize': {
    description: `The border-radius of the styled Meter. thickness, height and 
    width of the Bar Meter, height of the Circle Meter.`,
    type: 'object',
    defaultValue: `{
        none: '0px',
        hair: '1px',
        xxsmall: '3px',
        xsmall: '6px',
        small: '12px',
        medium: '24px',
        large: '48px',
        xlarge: '96px',
        responsiveBreakpoint: 'small',
    }`,
  },
  'global.opacity.medium': {
    description: 'The opacity value used on the Meter color.',
    type: 'number',
    defaultValue: '0.4',
  },
  'global.size': {
    description: 'The possible sizes for Circle Meter width.',
    type: 'object',
    defaultValue: `{
      xxsmall: '48px',
      xsmall: '96px',
      small: '192px',
      medium: '384px',
      large: '768px',
      xlarge: '1152px',
      xxlarge: '1536px',
      full: '100%',
    }`,
  },
  'meter.color': {
    description: 'The color used for the Meter.',
    type: 'string',
    defaultValue: 'accent-1',
  },
  'meter.extend': {
    description: 'Any additional style for Meter.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
};
