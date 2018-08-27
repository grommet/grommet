import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = (RangeInput) => {
  const DocumentedRangeInput = describe(RangeInput)
    .availableAt(getAvailableAtBadge('RangeInput'))
    .description('A range input with custom styles.')
    .usage(
      `import { RangeInput } from 'grommet';
<RangeInput />`
    );

  DocumentedRangeInput.propTypes = {
    id: PropTypes.string.description('The id attribute of the range input.'),
    min: PropTypes.number.description('The minimum value permitted.'),
    max: PropTypes.number.description('The maximum value permitted.'),
    name: PropTypes.string.description('The name attribute of the range input.'),
    onChange: PropTypes.func.description(
      `Function that will be called when the user changes the value. It will
      be passed an event object. The new input value will be available
      via 'event.target.value'.`
    ),
    step: PropTypes.number.description('The step interval between values.'),
    value: PropTypes.number.description('The current value.'),
  };

  return DocumentedRangeInput;
};
