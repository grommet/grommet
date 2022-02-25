import React, { useContext } from 'react';
import { Box } from '../Box';
import { PageContext } from '../Page';
import { PageContentPropTypes } from './propTypes';

const PageContent = ({ children, background, ...rest }) => {
  const { ...pageContext } = useContext(PageContext);

  if (background?.fill) {
    return (
      <Box background={background}>
        <Box {...pageContext} {...rest}>
          {children}
        </Box>
      </Box>
    );
  }
  return (
    <Box background={background} {...pageContext} {...rest}>
      {children}
    </Box>
  );
};

PageContent.displayName = 'PageContent';
PageContent.propTypes = PageContentPropTypes;

export { PageContent };
