import React from 'react';
import { storiesOf } from '@storybook/react';

import { mnet } from 'mnet-ui-base/themes';
import { Box, Text, ThemeContext, MnetUIBase } from 'mnet-ui-base';

const ExternalComponentWithTheme = () => (
  <MnetUIBase theme={mnet}>
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
  </MnetUIBase>
);

storiesOf('Theme', module).add('External Components', () => (
  <ExternalComponentWithTheme />
));
