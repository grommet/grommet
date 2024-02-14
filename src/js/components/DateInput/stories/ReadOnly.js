import React from 'react';
import { Box, DateInput } from 'grommet';

export const ReadOnly = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" pad="large">
    <Box width="medium" gap="medium">
      <DateInput
        aria-readonly
        value="02/11/2024"
        aria-label="read only"
        readOnly
        format="mm/dd/yyyy"
      />
      <DateInput
        aria-readonly
        value="02/11/2024"
        aria-label="read only copy"
        readOnly
        readOnlyCopy
        format="mm/dd/yyyy"
      />
    </Box>
  </Box>
  // </Grommet>
);

export default {
  title: 'Input/DateInput/ReadOnly',
};
