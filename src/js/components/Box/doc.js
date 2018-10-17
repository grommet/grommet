import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge, genericProps } from '../../utils';

const PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
const OVERFLOW_VALUES = ['auto', 'hidden', 'scroll', 'visible'];

const ANIMATION_TYPE = PropTypes.oneOf([
  'fadeIn', 'fadeOut', 'jiggle', 'pulse',
  'slideUp', 'slideDown', 'slideLeft', 'slideRight',
  'zoomIn', 'zoomOut']);
const ANIMATION_SHAPE = PropTypes.shape({
  type: ANIMATION_TYPE,
  delay: PropTypes.number,
  duration: PropTypes.number,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
});

export const doc = (Box) => {
  const DocumentedBox = describe(Box)
    .availableAt(getAvailableAtBadge('Box'))
    .description(
      'A flexible box that lays out its contents along a single direction.'
    )
    .usage(
      "import { Box } from 'grommet';\n<Box />"
    );
  DocumentedBox.propTypes = {
    ...genericProps,
    align: PropTypes.oneOf(['start', 'center', 'end', 'baseline', 'stretch'])
      .description('How to align the contents along the cross axis.'),
    alignContent: PropTypes.oneOf([
      'start', 'center', 'end', 'between', 'around', 'stretch',
    ])
      .description(`How to align the contents when there is extra space in
        the cross axis.`)
      .defaultValue('stretch'),
    animation: PropTypes.oneOfType([
      ANIMATION_TYPE,
      ANIMATION_SHAPE,
      PropTypes.arrayOf(
        PropTypes.oneOfType([ANIMATION_TYPE, ANIMATION_SHAPE]),
      ),
    ])
      .description(`Animation effect(s) to use. 'duration' and 'delay' should
        be in milliseconds. 'jiggle' and 'pulse' types are intended for
        small elements, like icons.`),
    background: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        color: PropTypes.string,
        dark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        image: PropTypes.string,
        position: PropTypes.string,
        opacity: PropTypes.oneOfType([
          PropTypes.oneOf(['weak', 'medium', 'strong']),
          PropTypes.bool,
        ]),
        light: PropTypes.string,
      }),
    ])
      .description(`Either a color identifier to use for the background
        color. For example: 'neutral-1'. Or, a 'url()' for an image. Dark
        is not needed if color is provided.`),
    basis: PropTypes.oneOfType([
      PropTypes.oneOf([
        'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full',
        '1/2', '1/3', '2/3', '1/4', '2/4', '3/4', 'auto',
      ]),
      PropTypes.string,
    ])
      .description('A fixed or relative size along its container\'s main axis.'),
    border: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['top', 'left', 'bottom', 'right',
        'horizontal', 'vertical', 'all']),
      PropTypes.shape({
        color: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            dark: PropTypes.string,
            light: PropTypes.string,
          }),
        ]),
        side: PropTypes.oneOf(['top', 'left', 'bottom', 'right',
          'horizontal', 'vertical', 'all']),
        size: PropTypes.oneOfType([
          PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
          PropTypes.string,
        ]),
      }),
    ])
      .description('Include a border.'),
    direction: PropTypes.oneOf(['row', 'column', 'row-responsive'])
      .description('The orientation to layout the child components in.')
      .defaultValue('column'),
    elevation: PropTypes.oneOfType([
      PropTypes.oneOf([
        'none', 'xsmall', 'small', 'medium', 'large', 'xlarge',
      ]),
      PropTypes.string,
    ])
      .description(`Elevated height above the underlying context, indicated
        via a drop shadow.`)
      .defaultValue('none'),
    flex: PropTypes.oneOf(['grow', 'shrink', true, false])
      .description('Whether flex-grow and/or flex-shrink is true.'),
    fill: PropTypes.oneOf(['horizontal', 'vertical', true, false])
      .description('Whether the width and/or height should fill the container.'),
    gap: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ])
      .description(`The amount of spacing between child elements. This
        should not be used in conjunction with 'wrap' as the gap elements
        will not wrap gracefully.`),
    height: PropTypes.oneOfType([
      PropTypes.oneOf([
        'xsmall', 'small', 'medium', 'large', 'xlarge',
      ]),
      PropTypes.string,
    ])
      .description('A fixed height.'),
    justify: PropTypes.oneOf(['start', 'center', 'between', 'end'])
      .description('How to align the contents along the main axis.'),
    overflow: PropTypes.oneOfType([
      PropTypes.oneOf(OVERFLOW_VALUES),
      PropTypes.shape({
        horizontal: PropTypes.oneOf(OVERFLOW_VALUES),
        vertical: PropTypes.oneOf(OVERFLOW_VALUES),
      }),
      PropTypes.string,
    ])
      .description('box overflow.'),
    pad: PropTypes.oneOfType([
      PropTypes.oneOf(['none', ...PAD_SIZES]),
      PropTypes.shape({
        bottom: PropTypes.oneOf(PAD_SIZES),
        horizontal: PropTypes.oneOf(PAD_SIZES),
        left: PropTypes.oneOf(PAD_SIZES),
        right: PropTypes.oneOf(PAD_SIZES),
        top: PropTypes.oneOf(PAD_SIZES),
        vertical: PropTypes.oneOf(PAD_SIZES),
      }),
      PropTypes.string,
    ])
      .description(`The amount of padding around the box contents. An
        object can be specified to distinguish horizontal padding, vertical
        padding, and padding on a particular side of the box`),
    responsive: PropTypes.bool.description(`Whether margin, pad, and border
      sizes should be scaled for mobile environments.`)
      .defaultValue(true),
    round: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full']),
      PropTypes.string,
      PropTypes.shape({
        corner: PropTypes.oneOf(['top', 'left', 'bottom', 'right',
          'top-left', 'top-right', 'bottom-left', 'bottom-right']),
        size: PropTypes.oneOfType([
          PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
          PropTypes.string,
        ]),
      }),
    ])
    .description('How much to round the corners.'),
    tag: PropTypes.string.description('The DOM tag to use for the element.')
      .defaultValue('div'),
    width: PropTypes.oneOfType([
      PropTypes.oneOf([
        'xsmall', 'small', 'medium', 'large', 'xlarge',
      ]),
      PropTypes.string,
    ])
      .description('A fixed width.'),
    wrap: PropTypes.bool.description(`Whether children can wrap if they
      can't all fit.`),
  };
  return DocumentedBox;
};
