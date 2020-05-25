import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Text, ThemeContext } from 'mnet-ui-base';

const ExternalComponentWithTheme = () => (
  <>
    <Box background="neutral-3">
      <Text color="light-1">This is a grommet component</Text>
    </Box>
    <ThemeContext.Consumer>
      {theme => (
        <div style={{ backgroundColor: theme.global.colors['neutral-3'] }}>
          <p style={{ color: theme.global.colors['light-1'] }}>
            This component is leveraging the grommet theme capabilities although
            it is not a grommet component
          </p>
        </div>
      )}
    </ThemeContext.Consumer>
  </>
);

storiesOf('Theme', module).add('External Components', () => (
  <ExternalComponentWithTheme />
));
