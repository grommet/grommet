import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = Image => {
  const DocumentedImage = describe(Image)
    .availableAt(getAvailableAtBadge('Image'))
    .description('An image.')
    .usage(
      `import { Image } from 'grommet';
<Image/>`,
    )
    .intrinsicElement('img');

  DocumentedImage.propTypes = {
    ...genericProps,
    fill: PropTypes.oneOfType([
      PropTypes.oneOf(['horizontal', 'vertical']),
      PropTypes.bool,
    ]).description(
      'Whether the width and/or height should fill the container.',
    ),
    fit: PropTypes.oneOf(['cover', 'contain']).description(
      'How the image fills its container.',
    ),
    fallback: PropTypes.string.description(
      `Specifies the URL of the fallback image used when 
      src is failing to load`,
    ),
    opacity: PropTypes.oneOfType([
      PropTypes.oneOf(['weak', 'medium', 'strong']),
      PropTypes.string,
      PropTypes.bool,
    ]).description('Transparency of the image.'),
  };

  return DocumentedImage;
};

export const themeDoc = {
  'global.opacity.medium': {
    description: 'The value used when opacity is set to true.',
    type: 'number',
    defaultValue: '0.4',
  },
  'image.extend': {
    description: 'Any additional style for the Image.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
};
