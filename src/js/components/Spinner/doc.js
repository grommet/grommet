import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = Spinner => {
  const DocumentedSpinner = describe(Spinner)
    .availableAt(getAvailableAtBadge('Spinner', 'Utilities'))
    .description('A Spinner.')
    .usage(
      `import { Spinner } from 'grommet';
<Spinner/>`,
    );

  DocumentedSpinner.propTypes = {
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ])
      .description('A fixed size.')
      .defaultValue('small'),
    color: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        dark: PropTypes.string,
        light: PropTypes.string,
      }),
    ])
      .description('The border color of the Spinner.')
      .defaultValue(undefined),
  };

  return DocumentedSpinner;
};

export const themeDoc = {
  'spinner.container': {
    description: `Any valid Box prop for the Spinner container. 
    Including 'color' for the spinner border color and 'size' for the default 
    size of the Spinner.`,
    type: 'object',
    defaultValue: {
      animation: 'rotateRight',
      color: 'brand',
      pad: 'small',
      round: 'full',
      size: 'small',
    },
  },
  'spinner.icon': {
    description: `An icon or an SVG to use as the default Spinner.`,
    type: 'ReactElement | SVG',
    defaultValue: undefined,
  },
  'spinner.size.xsmall': {
    description: 'The xsmall size of the Spinner.',
    type: 'string',
    defaultValue: '18px',
  },
  'spinner.size.small': {
    description: 'The small size of the Spinner.',
    type: 'string',
    defaultValue: '24px',
  },
  'spinner.size.medium': {
    description: 'The medium size of the Spinner.',
    type: 'string',
    defaultValue: '48px',
  },
  'spinner.size.large': {
    description: 'The large size of the Spinner.',
    type: 'string',
    defaultValue: '72px',
  },
  'spinner.size.xlarge': {
    description: 'The xlarge size of the Spinner.',
    type: 'string',
    defaultValue: '96px',
  },
};
