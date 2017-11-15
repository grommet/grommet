import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export default (RangeInput) => {
  const DocumentedRangeInput = describe(RangeInput)
    .availableAt(getAvailableAtBadge('RangeInput'))
    .description('A range input with custom styles.')
    .usage(
      `import { RangeInput } from 'grommet';
<RangeInput />`
    );

  DocumentedRangeInput.propTypes = {
    id: PropTypes.string.description('The id attribute of the range input.'),
    min: PropTypes.string.description('The min attribute of the range input.'),
    max: PropTypes.string.description('The max attribute of the range input.'),
    name: PropTypes.string.description('The name attribute of the range input.'),
    value: PropTypes.string.description('The value attribute of the range input.'),
  };

  return DocumentedRangeInput;
};
