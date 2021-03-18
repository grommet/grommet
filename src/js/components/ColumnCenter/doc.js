import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = ColumnCenter => {
  const DocumentedColumnCenter = describe(ColumnCenter)
    .availableAt(getAvailableAtBadge('ColumnCenter', 'Layout'))
    .description('Centered column layout.')
    .usage(
      `import { ColumnCenter } from 'grommet';
<ColumnCenter />`,
    )
    .intrinsicElement('div');

  DocumentedColumnCenter.propTypes = {
    gutter: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]).description('Minimum vertical gutters.'),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]).description('Maximum width of the content.'),
  };

  return DocumentedColumnCenter;
};
