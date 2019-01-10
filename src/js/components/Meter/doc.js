import { describe, PropTypes } from 'react-desc';

import {
  backgroundPropType,
  genericProps,
  getAvailableAtBadge,
} from '../../utils';

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
    background: backgroundPropType.defaultValue({
      color: 'light-2',
      opacity: 'medium',
    }),
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
