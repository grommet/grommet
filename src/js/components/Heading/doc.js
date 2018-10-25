import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = (Heading) => {
  const DocumentedHeading = describe(Heading)
    .availableAt(getAvailableAtBadge('Heading'))
    .description('Heading text structed in levels.')
    .usage(
      `import { Heading } from 'grommet';
<Heading />`
    );

  DocumentedHeading.propTypes = {
    ...genericProps,
    color: PropTypes.string.description(
      'A color identifier to use for the text color.'
    ),
    level: PropTypes.oneOf(
      [1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6']
    ).description(
      `The heading level. It corresponds to the number after the 'H' for
the DOM tag. Set the level for semantic accuracy and accessibility.
The sizing can be further adjusted using the size property.`
    ).defaultValue(1),
    responsive: PropTypes.bool.description(
      `Whether the font size should be scaled for
      mobile environments.`
    ).defaultValue(true),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]).description(
      `The font size is primarily driven by the chosen tag. But, it can
be adjusted via this size property. The tag should be set for semantic
correctness and accessibility. This size property allows for stylistic
adjustments.`
    ).defaultValue('medium'),
    textAlign: PropTypes.oneOf(['start', 'center', 'end']).description(
      'How to align the text inside the heading.'
    ).defaultValue('start'),
    truncate: PropTypes.bool.description(
      `Restrict the text to a single line and truncate with ellipsis if it
is too long to all fit.`
    ).defaultValue(false),
  };

  return DocumentedHeading;
};
