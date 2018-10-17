import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = (Anchor) => {
  const DocumentedAnchor = describe(Anchor)
    .availableAt(getAvailableAtBadge('Anchor'))
    .description(
      `A text link. We have a separate component from the browser
base so we can style it. You can either set the icon and/or label properties
or just use children.`
    )
    .usage(
      "import { Anchor } from 'grommet';\n<Anchor href={location} label='Label' />"
    );

  DocumentedAnchor.propTypes = {
    ...genericProps,
    a11yTitle: PropTypes.string.description('Custom title to be used by screen readers.'),
    color: PropTypes.string.description(`
      Label color and icon color, if not specified on the icon.
    `),
    href: PropTypes.string.description('Hyperlink reference to place in the anchor.'),
    icon: PropTypes.element.description('Icon element to place in the anchor.'),
    label: PropTypes.node.description('Label text to place in the anchor.'),
    onClick: PropTypes.func.description(`Click handler. It can be used, for example, 
    to add analytics and track who clicked in the anchor.`),
    primary: PropTypes.bool.description('Whether this is a primary anchor.'),
    reverse: PropTypes.bool.description(
      'Whether an icon and label should be reversed so that the icon is at the end of the anchor.'
    ),
  };

  return DocumentedAnchor;
};
