import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = Avatar => {
  const DocumentedAvatar = describe(Avatar)
    .availableAt(getAvailableAtBadge('Avatar'))
    .description('An Avatar.')
    .usage(
      `import { Avatar } from 'grommet';
<Avatar/>`,
    )
    .intrinsicElement('div');

  DocumentedAvatar.propTypes = {
    size: PropTypes.oneOfType([
      PropTypes.oneOf([
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
      ]),
      PropTypes.string,
    ])
      .description('A fixed size.')
      .defaultValue('xxsmall'),
    src: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).description(
      `Specifies a URL string for an avatar image, 
      or a node element for an icon.`,
    ),
  };

  return DocumentedAvatar;
};
