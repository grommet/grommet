import React, { useContext } from 'react';
import { Box } from '../Box';
import { PageContext } from '../Page';
import { PageSectionPropTypes } from './propTypes';

const PageSection = ({ background = 'none', children, full, ...rest }) => {
  const { ...pageContext } = useContext(PageContext);
  if (full) {
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

PageSection.displayName = 'PageSection';
PageSection.propTypes = PageSectionPropTypes;

export { PageSection };
