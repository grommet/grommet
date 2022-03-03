import React, { useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { PageContext } from './PageContext';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { PagePropTypes } from './propTypes';

const Page = ({ kind, ...rest }) => {
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);

  const contentValue = useMemo(
    () => ({
      alignSelf: theme.page[kind]?.alignSelf,
      width: theme.page[kind]?.width,
      ...theme.page[kind][size],
    }),
    [theme, size, kind],
  );

  return (
    <PageContext.Provider value={contentValue}>
      <Box fill="horizontal" {...rest} />
    </PageContext.Provider>
  );
};

Page.displayName = 'Page';
Page.propTypes = PagePropTypes;
Page.defaultProps = {
  kind: 'wide',
};

export { Page };
