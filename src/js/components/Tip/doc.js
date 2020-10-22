import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = Tip => {
  const DocumentedTip = describe(Tip)
    .availableAt(getAvailableAtBadge('Tip'))
    .description(
      `Tooltip or a hint when hovering over a UI item. 
    The tooltip will render when hovering on top of the 
    Tip child node or string.`,
    )
    .usage(
      `import { Tip } from 'grommet';
<Tip />`,
    )
    .intrinsicElement('span'); // TODO after resolving the Box wrapper issue

  DocumentedTip.propTypes = {
    content: PropTypes.node.description(`The tooltip content inside the drop.`),
    dropProps: PropTypes.object
      .description('Any valid Drop prop to style the Tip drop container.')
      .defaultValue({
        align: { top: 'bottom' },
        plain: true,
        trapFocus: false,
      }),
  };

  return DocumentedTip;
};

export const themeDoc = {
  'tip.content': {
    description: 'Any valid Box property for the Tip container.',
    type: 'object',
    defaultValue: undefined,
  },
  'tip.drop': {
    description: 'Any valid Drop property for the Tooltip.',
    type: 'object',
    defaultValue: undefined,
  },
};
