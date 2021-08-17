import React, { forwardRef, useState } from 'react';
import { StyledImage } from './StyledImage';
import { ImagePropTypes } from './propTypes';

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
Image.propTypes = ImagePropTypes;

export { Image };
