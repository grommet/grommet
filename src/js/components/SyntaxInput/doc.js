import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = SyntaxInput => {
  const DocumentedSyntaxInput = describe(SyntaxInput)
    .availableAt(getAvailableAtBadge('SyntaxInput'))
    .description('An input field with formalized syntax.')
    .usage(
      `import { SyntaxInput } from 'grommet';
<SyntaxInput id='item' name='item' />`,
    );

  DocumentedSyntaxInput.propTypes = {
    id: PropTypes.string.description('The id attribute of the input.'),
    name: PropTypes.string.description('The name attribute of the input.'),
    onChange: PropTypes.func.description(
      'Function that will be called when the user types in the input.',
    ),
    schema: PropTypes.arrayOf(
      PropTypes.shape({
        length: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.arrayOf(PropTypes.number),
        ]),
        onActive: PropTypes.func,
        onInactive: PropTypes.func,
        fixed: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.string),
      }),
    ).description('Describes the structure of the syntax.'),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]).description('The size of the SyntaxInput.'),
    value: PropTypes.string.description(
      `What text to put in the input. It will automatically take
      care of schema alignment`,
    ),
  };

  return DocumentedSyntaxInput;
};
