import React, { useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { PageContext } from './PageContext';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { PagePropTypes } from './propTypes';
import { PageContent } from '../PageContent';

const Page = ({ children, contentProps, customizeContent, kind, ...rest }) => {
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);

  const value = useMemo(
    () => ({
      alignSelf: theme.page[kind]?.alignSelf,
      fill: 'horizontal',
      width: theme.page[kind]?.width,
      ...theme.page[kind][size],
    }),
    [theme, size, kind],
  );

  let content = <PageContent {...contentProps}>{children}</PageContent>;
  if (customizeContent) content = children;

  return (
    <PageContext.Provider value={value}>
      <Box fill="horizontal" {...rest}>
        {content}
      </Box>
    </PageContext.Provider>
  );
};

Page.displayName = 'Page';
Page.propTypes = PagePropTypes;
Page.defaultProps = {
  customizeContent: false,
  kind: 'wide',
};

export { Page };
