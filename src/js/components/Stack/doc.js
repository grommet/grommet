import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = Stack => {
  const DocumentedStack = describe(Stack)
    .availableAt(getAvailableAtBadge('Stack'))
    .description('Stacks components on top of the first child component.')
    .usage(
      `import { Stack } from 'grommet';
<Stack />`
    );

  DocumentedStack.propTypes = {
    ...genericProps,
    anchor: PropTypes.oneOf([
      'center',
      'left',
      'right',
      'top',
      'bottom',
      'top-left',
      'bottom-left',
      'top-right',
      'bottom-right',
    ]).description(`Where to anchor children from. If not specified, children
      fill the guiding child's area.`),
    fill: PropTypes.bool
      .description(
        `Whether to expand to fill
      all of the available width and height in the parent container.`
      )
      .defaultValue(false),
    guidingChild: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['first', 'last']),
    ])
      .description(
        `Which child to guide layout from. All other children
      will be positioned within that area. Defaults to 'first'.`
      )
      .defaultValue('first'),
  };

  return DocumentedStack;
};
