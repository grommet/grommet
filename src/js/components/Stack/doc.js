import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export default (Stack) => {
  const DocumentedStack = describe(Stack)
    .availableAt(getAvailableAtBadge('Stack'))
    .description(
      'Stacks components on top of the first child component.'
    ).usage(
      `import { Stack } from 'grommet';
<Stack />`
    );

  DocumentedStack.propTypes = {
    anchor: PropTypes.oneOf(
      [
        'center', 'left', 'right', 'top', 'bottom',
        'top-left', 'bottom-left', 'top-right', 'bottom-right',
      ]
    ).description(
      `Where to anchor children from. If not specified, children fill the
first child's area.`
    ),
  };

  return DocumentedStack;
};
