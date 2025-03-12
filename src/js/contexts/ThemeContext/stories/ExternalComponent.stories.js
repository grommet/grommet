import React from 'react';

import { grommet } from 'grommet/themes';
import { Box, Text, ThemeContext, Grommet } from 'grommet';

export const ExternalComponentWithTheme = () => (
  <Grommet theme={grommet}>
    <Box background="neutral-3">
      <Text color="light-1">This is a grommet component</Text>
    </Box>
    <ThemeContext.Consumer>
      {(theme) => (
        <div style={{ backgroundColor: theme.global.colors['neutral-3'] }}>
          <p style={{ color: theme.global.colors['light-1'] }}>
            This component is leveraging the grommet theme capabilities although
            it is not a grommet component
          </p>
        </div>
      )}
    </ThemeContext.Consumer>
  </Grommet>
);

ExternalComponentWithTheme.storyName = 'External components';

export default {
  title: 'Utilities/ThemeContext/External components',
};
