import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge, genericProps } from '../../utils';

export const doc = Paragraph => {
  const DocumentedParagraph = describe(Paragraph)
    .availableAt(getAvailableAtBadge('Paragraph'))
    .description('A paragraph of text.')
    .usage(
      `import { Paragraph } from 'grommet';
<Paragraph />`,
    );

  DocumentedParagraph.propTypes = {
    ...genericProps,
    color: PropTypes.string.description(
      'A color identifier to use for the text color.',
    ),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'xxlarge']),
      PropTypes.string,
    ])
      .description('The size of the Paragraph text.')
      .defaultValue('medium'),
    textAlign: PropTypes.oneOf(['start', 'center', 'end'])
      .description('How to align the text inside the paragraph.')
      .defaultValue('start'),
  };

  return DocumentedParagraph;
};
