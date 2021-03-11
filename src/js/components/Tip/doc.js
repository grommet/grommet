import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = Tip => {
  const DocumentedTip = describe(Tip)
    .availableAt(getAvailableAtBadge('Tip', 'Controls'))
    .description(
      `Tooltip or a hint when hovering over an element. The tooltip will render 
      when hovering on top of the Tip's child node or string.`,
    )
    .usage(
      `import { Tip } from 'grommet';
<Tip />`,
    );

  DocumentedTip.propTypes = {
    content: PropTypes.node.description(`The tooltip content inside the drop.`),
    dropProps: PropTypes.object
      .description('Any valid Drop prop to style the Tip drop container.')
      .defaultValue({
        trapFocus: false,
      }),
    plain: PropTypes.bool
      .description(
        `Whether content should have default styling from tip.content.`,
      )
      .defaultValue(undefined),
  };

  return DocumentedTip;
};

export const themeDoc = {
  'tip.content': {
    description: `Any valid Box property for the Tip container. Not applicable 
    when using Tip plain prop.`,
    type: 'object',
    defaultValue: `{ background: 'background-contrast', elevation: 'small', 
    margin: 'xsmall', pad: { vertical: 'xsmall', horizontal: 'small' }, 
    round: 'small'}`,
  },
  'tip.drop': {
    description: 'Any valid Drop property for the Tip.',
    type: 'object',
    defaultValue: `{
      align: { top: 'bottom' },   
      background: 'none',
      elevation: 'none',
      margin: 'none'
    }`,
  },
};
