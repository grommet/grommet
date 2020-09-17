import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils/mixins';
import { themeDocUtils } from '../../utils/themeDocUtils';

export const doc = Tip => {
  const DocumentedTip = describe(Tip)
    .availableAt(getAvailableAtBadge('Tip'))
    .description('Arbitrary text.')
    .usage(
      `import { Tip } from 'grommet';
<Tip />`,
    )
    .intrinsicElement('span');

  DocumentedTip.propTypes = {
    textAlign: PropTypes.oneOf(['start', 'center', 'end'])
      .description('How to align the text inside the component.')
      .defaultValue('start'),
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
