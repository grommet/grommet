import React, { forwardRef, useState } from 'react';
import { StyledImage } from './StyledImage';

const Image = forwardRef(
  ({ a11yTitle, fallback, onError, opacity, fill, src, ...rest }, ref) => {
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
        aria-label={a11yTitle}
        {...rest}
        {...extraProps}
        ref={ref}
        opacityProp={opacity}
        fillProp={fill}
        src={!imageMissing ? src : fallback}
      />
    );
  },
);

Image.displayName = 'Image';

let ImageDoc;
if (process.env.NODE_ENV !== 'production') {
  ImageDoc = require('./doc').doc(Image); // eslint-disable-line global-require
}

const ImageWrapper = ImageDoc || Image;

export { ImageWrapper as Image };
