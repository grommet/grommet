import { PropTypes } from 'react-desc';

export const a11yTitlePropType = PropTypes.string.description(
  `Custom label to be used by screen readers. When provided, an aria-label will
   be added to the element.`,
);

export const getBorderPropType = ({ includeBetween = true }) =>
  PropTypes.shape({
    color: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        dark: PropTypes.string,
        light: PropTypes.string,
      }),
    ]),
    side: PropTypes.oneOf([
      'top',
      'left',
      'bottom',
      'right',
      'start',
      'end',
      'horizontal',
      'vertical',
      'all',
      ...(includeBetween ? ['between'] : []),
    ]),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]),
    style: PropTypes.oneOf([
      'solid',
      'dashed',
      'dotted',
      'double',
      'groove',
      'ridge',
      'inset',
      'outset',
      'hidden',
    ]).defaultValue('solid'),
  });

export const colorPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({ dark: PropTypes.string, light: PropTypes.string }),
]);

export const backgroundPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    color: colorPropType,
    dark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    image: PropTypes.string,
    position: PropTypes.string,
    opacity: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.oneOf(['weak', 'medium', 'strong']),
    ]),
    repeat: PropTypes.oneOfType([
      PropTypes.oneOf(['no-repeat', 'repeat']),
      PropTypes.string,
    ]),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['cover', 'contain']),
      PropTypes.string,
    ]),
    light: PropTypes.string,
  }),
]);

export const backgroundDoc = backgroundPropType.description(`Either a color 
identifier to use for the background color. For example: 'neutral-1'. Or, a 
'url()' for an image. Dark is not needed if color is provided.`);

export const MARGIN_SIZES = [
  'xxsmall',
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
];

export const marginProp = PropTypes.oneOfType([
  PropTypes.oneOf(['none', ...MARGIN_SIZES]),
  PropTypes.shape({
    bottom: PropTypes.oneOfType([
      PropTypes.oneOf(MARGIN_SIZES),
      PropTypes.string,
    ]),
    end: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
    horizontal: PropTypes.oneOfType([
      PropTypes.oneOf(MARGIN_SIZES),
      PropTypes.string,
    ]),
    left: PropTypes.oneOfType([
      PropTypes.oneOf(MARGIN_SIZES),
      PropTypes.string,
    ]),
    right: PropTypes.oneOfType([
      PropTypes.oneOf(MARGIN_SIZES),
      PropTypes.string,
    ]),
    start: PropTypes.oneOfType([
      PropTypes.oneOf(MARGIN_SIZES),
      PropTypes.string,
    ]),
    top: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
    vertical: PropTypes.oneOfType([
      PropTypes.oneOf(MARGIN_SIZES),
      PropTypes.string,
    ]),
  }),
  PropTypes.string,
]).description(`The amount of margin around the component. An object can
    be specified to distinguish horizontal margin, vertical margin, and
    margin on a particular side.`);

const PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];

export const padPropType = PropTypes.oneOfType([
  PropTypes.oneOf(['none', ...PAD_SIZES]),
  PropTypes.shape({
    bottom: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
    end: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
    horizontal: PropTypes.oneOfType([
      PropTypes.oneOf(PAD_SIZES),
      PropTypes.string,
    ]),
    left: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
    right: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
    start: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
    top: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
    vertical: PropTypes.oneOfType([
      PropTypes.oneOf(PAD_SIZES),
      PropTypes.string,
    ]),
  }),
  PropTypes.string,
])
  .description(
    `The amount of padding around the box contents. An
    object can be specified to distinguish horizontal padding, vertical
    padding, and padding on a particular side of the box`,
  )
  .defaultValue('none');

export const genericProps = {
  a11yTitle: a11yTitlePropType,
  alignSelf: PropTypes.oneOf(['start', 'center', 'end', 'stretch'])
    .description(`How to align along the cross axis when contained in
      a Box or along the column axis when contained in a Grid.`),
  gridArea: PropTypes.string.description(`The name of the area to place
    this inside a parent Grid.`),
  margin: marginProp,
};

export const elevationPropType = PropTypes.oneOfType([
  PropTypes.oneOf(['none', 'xsmall', 'small', 'medium', 'large', 'xlarge']),
  PropTypes.string,
]);

export const hoverIndicatorPropType = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.string,
  PropTypes.oneOf(['background']),
  backgroundPropType,
  PropTypes.shape({
    background: backgroundPropType,
    elevation: elevationPropType,
  }),
]);

export const pointPropType = PropTypes.oneOf([
  'circle',
  'diamond',
  'square',
  'star',
  'triangle',
  'triangleDown',
]);

export const patternPropType = PropTypes.oneOf([
  'squares',
  'circles',
  'stripesHorizontal',
  'stripesVertical',
  'stripesDiagonalDown',
  'stripesDiagonalUp',
]);

export const roundPropType = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full']),
  PropTypes.string,
  PropTypes.shape({
    corner: PropTypes.oneOf([
      'top',
      'left',
      'bottom',
      'right',
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ]),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]),
  }),
])
  .description('How much to round the corners.')
  .defaultValue(undefined);
