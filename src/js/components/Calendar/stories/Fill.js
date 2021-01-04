import React from 'react';

import { Box, Calendar, Grommet } from 'grommet';

import { grommet } from 'grommet/themes';

export const Fill = () => {
  return (
    <Grommet theme={grommet}>
      <Box align="center">
        <Box height="large" width="large" border>
          <Calendar fill daysOfWeek />
        </Box>
      </Box>
    </Grommet>
  );
};
