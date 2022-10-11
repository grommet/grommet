import React, { useContext } from 'react';

import { Box, Grommet, Skeleton, ThemeContext} from 'grommet';

const Content = () => (
  <Box fill align="center" pad="large" gap="small">
    <Skeleton height="small" />
    <Skeleton />
  </Box>
);

export const Simple = () => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <Grommet theme={theme}>
        <Content />
      </Grommet>
      <Grommet theme={theme} themeMode="dark">
        <Content />
      </Grommet>
    </>
  );
};

export default {
  title: 'Visualizations/Skeleton/Simple',
};
