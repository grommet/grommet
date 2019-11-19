import { describe } from 'react-desc';

import { ROUTER_PROPS, getAvailableAtBadge } from '../../utils';

export const doc = RoutedButton => {
  const DocumentedRoutedButton = describe(RoutedButton)
    .availableAt(getAvailableAtBadge('RoutedButton'))
    .description('A button with support for React Router.')
    .usage(
      `import { RoutedButton } from 'grommet';
<RoutedButton primary path='/documentation' />`,
    )
    .intrinsicElement('button');
  DocumentedRoutedButton.propTypes = { ...ROUTER_PROPS };
  return DocumentedRoutedButton;
};
