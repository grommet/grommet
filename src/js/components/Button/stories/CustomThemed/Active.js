import React from 'react';
import { Grommet, Button, Box, Text } from 'grommet';
import { Add } from 'grommet-icons';

export const Active = () => (
  <Grommet
    theme={{
      global: {
        font: {
          family: `-apple-system, BlinkMacSystemFont`,
        },
      },
      button: { default: {} }, // enabling kind button functionality
    }}
  >
    <Box pad="large" align="center">
      <Button hoverIndicator="light-1" onClick={() => {}} active>
        {/*  When kind Button include children, it is treated as plain */}
        <Box pad="small" direction="row" align="center" gap="small">
          <Add />
          <Text>Kind</Text>
        </Box>
      </Button>
    </Box>
  </Grommet>
);

Active.storyName = 'Active';

export default {
  title: 'Controls/Button/Custom Themed/Active',
};
