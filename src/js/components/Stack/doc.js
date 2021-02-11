import { describe, PropTypes } from 'react-desc';

import { genericProps } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = Stack => {
  const DocumentedStack = describe(Stack)
    .availableAt(getAvailableAtBadge('Stack', 'Layout'))
    .description(
      `A container that stacks contents on top of each other. One child is
      designated as the \`guidingChild\` which determines the size. All
      other children are placed within that size, either above or below
      based on their order. Stack is typically used to decorate Meter, Chart,
      or icons.`,
    )
    .usage(
      `import { Stack } from 'grommet';
<Stack />`,
    )
    .intrinsicElement('div');

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
    fill: PropTypes.oneOfType([
      PropTypes.oneOf(['horizontal', 'vertical']),
      PropTypes.bool,
    ])
      .description(
        `Whether to expand to fill
      all of the available width and height in the parent container.`,
      )
      .defaultValue(false),
    guidingChild: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['first', 'last']),
    ])
      .description(
        `Which child to guide layout from. All other children
      will be positioned within that area. Defaults to 'first'.`,
      )
      .defaultValue('first'),
    interactiveChild: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['first', 'last']),
    ]).description(
      `Which child to restrict user interaction to. All other children
      will have user interaction disabled.`,
    ),
  };

  return DocumentedStack;
};

export const themeDoc = {
  'stack.extend': {
    description: 'Any additional style for the control of the Stack component.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
};
