import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = Carousel => {
  const DocumentedCarousel = describe(Carousel)
    .availableAt(getAvailableAtBadge('Carousel'))
    .description(
      `A carousel that cycles through children. Child components
      would typically be Images. It is the caller's responsibility to ensure
      that all children are the same size.`,
    )
    .usage(
      `import { Carousel } from 'grommet';
<Carousel />`,
    );

  DocumentedCarousel.propTypes = {
    ...genericProps,
    fill: PropTypes.bool.description(`Whether to expand to fill
      all of the available width and height in the parent container.`),
    play: PropTypes.number.description(`If specified, the number of
      milliseconds between automatically transitioning to the next child. It
      will loop through all children indefinitely.`),
  };

  return DocumentedCarousel;
};

export const themeDoc = {
  'carousel.icons.next': {
    description: 'The icon to use for the next image navigation control.',
    type: 'element',
    defaultValue: '<Next />',
  },
  'carousel.icons.previous': {
    description: 'The icon to use for the previous image navigation control.',
    type: 'element',
    defaultValue: '<Previous />',
  },
  'carousel.icons.current': {
    description:
      'The icon to use on the middle navigation control. One icon per carousel image.',
    type: 'element',
    defaultValue: '<Next />',
  },
  'carousel.icons.color': {
    description: 'The color used for Carousel icons.',
    type: 'string',
    defaultValue: undefined,
  },
};
