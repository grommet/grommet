import { describe } from 'react-desc';

import { ROUTER_PROPS, getAvailableAtBadge } from '../../utils';

export const doc = RoutedAnchor => {
  const DocumentedRoutedAnchor = describe(RoutedAnchor)
    .availableAt(getAvailableAtBadge('RoutedAnchor'))
    .description('An Anchor with support for React Router.')
    .usage(
      "import { RoutedAnchor } from 'grommet';\n<RoutedAnchor primary path='/documentation' />",
    )
    .intrinsicElement('a');
  DocumentedRoutedAnchor.propTypes = { ...ROUTER_PROPS };
  return DocumentedRoutedAnchor;
};
