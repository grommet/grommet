import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils/mixins';
import { themeDocUtils } from '../../utils/themeDocUtils';

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
    dropProps: PropTypes.object.description(
      'Any valid Drop prop to style the Tip drop container.',
    ),
  };

  return DocumentedTip;
};

export const themeDoc = {
  tip: {
    description: 'Any valid Drop property for the Tip.',
    type: 'object',
    defaultValue: undefined,
  },
  'tip.container': {
    description: 'Any valid Box property for the Tip container.',
    type: 'object',
    defaultValue: "{ round: 'small', elevation: 'small' }",
  },
  ...themeDocUtils.edgeStyle('The possible sizes for margin.'),
};
