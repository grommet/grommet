import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = (Paragraph) => {
  const DocumentedParagraph = describe(Paragraph)
    .availableAt(getAvailableAtBadge('Paragraph'))
    .description('A paragraph of text.')
    .usage(
      `import { Paragraph } from 'grommet';
<Paragraph />`
    );

  DocumentedParagraph.propTypes = {
    color: PropTypes.string.description(
      `A color identifier to use for the text color. For example:
'status-critical'.`
    ),
    margin: PropTypes.oneOfType([
      PropTypes.oneOf(['none', 'small', 'medium', 'large']),
      PropTypes.shape({
        bottom: PropTypes.oneOfType([
          PropTypes.oneOf(['small', 'medium', 'large']),
          PropTypes.string,
        ]),
        top: PropTypes.oneOfType([
          PropTypes.oneOf(['small', 'medium', 'large']),
          PropTypes.string,
        ]),
      }),
      PropTypes.string,
    ]).description(
      `The amount of margin above and/or below the paragraph. An object can be
specified to distinguish top margin and bottom margin.`
    ),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]).description(
      'The size of the Paragraph text.'
    ).defaultValue('medium'),
    textAlign: PropTypes.oneOf(['start', 'center', 'end']).description(
      'How to align the text inside the paragraph.'
    ),
  };

  return DocumentedParagraph;
};
