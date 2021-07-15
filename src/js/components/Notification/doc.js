import { describe } from 'react-desc';

import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = (Notification) => {
  const DocumentedNav = describe(Notification)
    .availableAt(getAvailableAtBadge('Notification', 'Controls'))
    .description('Is a container for notifications')
    .usage(
      `import { Notification } from 'grommet';
      <Notification />`,
    );

  return DocumentedNav;
};
