import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = Grommet => {
  const DocumentedGrommet = describe(Grommet)
    .availableAt(getAvailableAtBadge('Grommet'))
    .description('This is the top level Grommet container.')
    .usage(
      `import { Grommet } from 'grommet';
<Grommet>...</Grommet>`
    );

  DocumentedGrommet.propTypes = {
    full: PropTypes.bool.description('Whether to take the whole viewport.'),
    theme: PropTypes.object.description('Custom styles for Grommet app component.'),
  };

  return DocumentedGrommet;
};
