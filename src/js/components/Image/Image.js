import React, { useState } from 'react';
import { StyledImage } from './StyledImage';

const Image = ({ src, fallback, onError, ...rest }) => {
  const [imageMissing, setImageMissing] = useState(false);
  const handleError = event => {
    if (onError) {
      onError(event);
    }
    setImageMissing(true);
  };
  const extraProps = {
    onError: (onError || fallback) && handleError,
  };
  return (
    <StyledImage
      {...rest}
      {...extraProps}
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
