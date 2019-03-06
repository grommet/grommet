import React, { useState } from 'react';
import { StyledImage } from './StyledImage';

const Image = ({ src, fallback, ...rest }) => {
  const [imageMissing, setImageMissing] = useState(false);
  return (
    <StyledImage
      {...rest}
      onError={() => setImageMissing(true)}
      src={!imageMissing ? src : fallback}
    />
  );
};

let ImageDoc;
if (process.env.NODE_ENV !== 'production') {
  ImageDoc = require('./doc').doc(Image); // eslint-disable-line global-require
}
const ImageWrapper = ImageDoc || Image;
ImageWrapper.displayName = 'Image';

export { ImageWrapper as Image };
