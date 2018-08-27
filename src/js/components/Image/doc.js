import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = (Image) => {
  const DocumentedImage = describe(Image)
    .availableAt(getAvailableAtBadge('Image'))
    .description('An image.')
    .usage(
      `import { Image } from 'grommet';
<Image/>`
    );

  DocumentedImage.propTypes = {
    fit: PropTypes.oneOf(['cover', 'contain']).description(
      'How the image fills its container.'
    ),
  };

  return DocumentedImage;
};
