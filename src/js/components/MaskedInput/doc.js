import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = MaskedInput => {
  const DocumentedMaskedInput = describe(MaskedInput)
    .availableAt(getAvailableAtBadge('MaskedInput'))
    .description('An input field with formalized syntax.')
    .usage(
      `import { MaskedInput } from 'grommet';
<MaskedInput id='item' name='item' />`,
    );

  DocumentedMaskedInput.propTypes = {
    id: PropTypes.string.description('The id attribute of the input.'),
    name: PropTypes.string.description('The name attribute of the input.'),
    onChange: PropTypes.func.description(
      'Function that will be called when the user types.',
    ),
    mask: PropTypes.arrayOf(
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
    ).description('Describes the structure of the mask.'),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]).description('The size of the text.'),
    value: PropTypes.string.description(
      `What text to put in the input. It will automatically be aligned to
      the mask.`,
    ),
  };

  return DocumentedMaskedInput;
};
