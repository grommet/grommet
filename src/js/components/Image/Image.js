import React, { forwardRef, useState } from 'react';
import { StyledImage } from './StyledImage';
import { ImagePropTypes } from './propTypes';

const Image = forwardRef(
  ({ a11yTitle, fallback, onError, opacity, fill, src, ...rest }, ref) => {
    const [isFallbackInUse, setFallbackFlag] = useState(false);

    const handleError = (event)=>{
      if(!isFallbackInUse)
        event.target.src=fallback;
      setFallbackFlag(true);
    };

    const handleOnLoad = () => {
      setFallbackFlag(false);
    };

    const extraProps = {
      onError: handleError,
      onLoad : handleOnLoad,
    };
    
    return (
      <StyledImage
        aria-label={a11yTitle}
        {...rest}
        {...extraProps}
        ref={ref}
        opacityProp={opacity}
        fillProp={fill}
        src={src}
      />
    );
  },
);

Image.displayName = 'Image';
Image.propTypes = ImagePropTypes;

export { Image };
