import React from 'react';

import { Add } from 'grommet-icons';

import { Box, Button, Text } from 'grommet';

export const Active = () => (
  <Box pad="large" gap="large">
    {/* Out of the Box Button */}
    <Box align="center">
      <Button hoverIndicator="light-1" onClick={() => {}} active>
        {/*  When Button include children, it is treated as plain */}
        <Box pad="small" direction="row" align="center" gap="small">
          <Add />
          <Text>Add</Text>
        </Box>
      </Button>
    </Box>
  </Box>
);

export default {
  title: 'Controls/Button/Active',
};
