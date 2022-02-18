import React, { useContext } from 'react';
import { Box } from '../Box';
import { PageContext } from '../Page';
import { PageSectionPropTypes } from './propTypes';

const PageSection = ({ children, fullBackground, ...rest }) => {
  const { ...pageContext } = useContext(PageContext);
  const contents = (
    <Box {...pageContext} {...rest}>
      {children}
    </Box>
  );
  if (fullBackground) {
    return <Box background={fullBackground}>{contents}</Box>;
  }
  return contents;
};

PageSection.displayName = 'PageSection';
PageSection.propTypes = PageSectionPropTypes;

export { PageSection };
