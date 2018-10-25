import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = Carousel => {
  const DocumentedCarousel = describe(Carousel)
    .availableAt(getAvailableAtBadge('Carousel'))
    .description(
      `A carousel that cycles through children. Child components
      would typically be Images. It is the caller's responsibility to ensure
      that all children are the same size.`
    )
    .usage(
      `import { Carousel } from 'grommet';
<Carousel />`
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
