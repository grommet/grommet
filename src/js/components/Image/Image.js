import React, { forwardRef, useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { StyledImage } from './StyledImage';
import { ImagePropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';

const Image = forwardRef(
  (
    { a11yTitle, fallback, onError, onLoad, opacity, fill, src, ...rest },
    ref,
  ) => {
    const theme = useThemeValue();
    const withinThemeContext = useContext(ThemeContext);
    const [isFallbackInUse, setFallbackInUse] = useState(false);

    const handleError = (event) => {
      if (onError) onError(event);
      if (!isFallbackInUse && fallback && fallback !== '') {
        // eslint-disable-next-line no-param-reassign
        event.target.src = fallback;
        setFallbackInUse(true);
      }
    };

    const handleOnLoad = (event) => {
      if (onLoad) onLoad(event);
      setFallbackInUse(false);
    };

    const extraProps = {
      onError: (onError || fallback) && handleError,
      onLoad: handleOnLoad,
    };

    return (
      <StyledImage
        aria-label={a11yTitle}
        {...(withinThemeContext === undefined ? { theme } : {})}
        {...rest}
        {...extraProps}
        ref={ref}
        opacityProp={opacity}
        fillProp={fill}
        src={src === undefined ? '' : src}
      />
    );
  },
);

Image.displayName = 'Image';
Image.propTypes = ImagePropTypes;

export { Image };
