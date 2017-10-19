import { describe, PropTypes } from 'react-desc';

export default (Paragraph) => {
  const DocumentedParagraph = describe(Paragraph).description('A paragraph of text.').usage(
    `import { Paragraph } from 'grommet';
    <Paragraph/>`
  );

  DocumentedParagraph.propTypes = {
    margin: PropTypes.oneOfType([
      PropTypes.oneOf(['none', 'small', 'medium', 'large']),
      PropTypes.shape({
        bottom: PropTypes.oneOf(['small', 'medium', 'large']),
        top: PropTypes.oneOf(['small', 'medium', 'large']),
      }),
    ]).description(
      `The amount of margin above and/or below the paragraph. An object can be
      specified to distinguish top margin and bottom margin.`
    ),
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']).description(
      'The size of the Paragraph text.'
    ).defaultProp('medium'),
    textAlign: PropTypes.oneOf(['start', 'center', 'end']).description(
      'How to align the text inside the paragraph.'
    ),
  };

  return DocumentedParagraph;
};
