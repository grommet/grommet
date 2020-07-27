import React, { forwardRef } from 'react';
import { Box } from '../Box';

import { LoaderWrap, StyledLoader } from './StyledLoader';

const Loader = forwardRef(
  (
    {
      children,
      primaryColor = 'brand',
      secondaryColor = 'white',
      type = 'circle',
      ...rest
    },
    ref,
  ) => {
    return (
      <Box ref={ref}>
        {type === 'inline' ? (
          <StyledLoader
            afterBeforeBg={secondaryColor}
            background={primaryColor}
            align="center"
            justify="center"
            {...rest}
          />
        ) : (
          <LoaderWrap
            align="center"
            justify="center"
            background={secondaryColor}
            {...rest}
          >
            <StyledLoader
              afterBeforeBg={secondaryColor}
              background={primaryColor}
              {...rest}
            />
          </LoaderWrap>
        )}
      </Box>
    );
  },
);

Loader.displayName = 'Loader';

export { Loader };
