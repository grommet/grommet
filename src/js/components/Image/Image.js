import React, { useState } from 'react';
import { compose } from 'recompose';
import { withForwardRef } from '../hocs';
import { StyledImage } from './StyledImage';

const Image = ({
  fallback,
  forwardRef,
  onError,
  opacity,
  fill,
  src,
  ...rest
}) => {
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
      ref={forwardRef}
      opacityProp={opacity}
      fillProp={fill}
      src={!imageMissing ? src : fallback}
    />
  );
};

let ImageDoc;
if (process.env.NODE_ENV !== 'production') {
  ImageDoc = require('./doc').doc(Image); // eslint-disable-line global-require
}

const ImageWrapper = compose(withForwardRef)(ImageDoc || Image);

export { ImageWrapper as Image };
