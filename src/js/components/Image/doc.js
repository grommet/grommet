import { describe, PropTypes } from 'react-desc';

export default (Image) => {
  const DocumentedImage = describe(Image).description('An image.').usage(
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
