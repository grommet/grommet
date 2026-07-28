import React from 'react';

import { Box, Heading, ThemeContext, TimeInput } from 'grommet';

export const ThemingLightDark = () => (
  <Box gap="xlarge">
    <Box pad="xlarge" background="background-front">
      <Heading level={3}>Light Theme</Heading>
      <TimeInput format="12" defaultValue="12:34:56" />
    </Box>
    <ThemeContext.Extend value={{ dark: true }}>
      <Box pad="xlarge" background="background-front">
        <Heading level={3}>Dark Theme</Heading>
        <TimeInput format="12" defaultValue="12:34:56" />
      </Box>
    </ThemeContext.Extend>
  </Box>
);

export default {
  title: 'Input/TimeInput/Theming Light Dark',
};
