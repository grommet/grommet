import React, { useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { PageContext } from './PageContext';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { PagePropTypes } from './propTypes';

const Page = ({ kind, ...rest }) => {
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);

  const value = useMemo(
    () => ({
      alignSelf: theme.page[kind].alignSelf,
      fill: 'horizontal',
      width: theme.page[kind].width,
      pad: theme.page[kind].pad[size],
    }),
    [theme, size, kind],
  );

  return (
    <PageContext.Provider value={value}>
      <Box width={{ min: theme.page[kind].width.min }} {...rest} />
    </PageContext.Provider>
  );
};

Page.displayName = 'Page';
Page.propTypes = PagePropTypes;

export { Page };
