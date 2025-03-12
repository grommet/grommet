import React from 'react';

import { Grommet, Box } from 'grommet';

export const Plain = () => (
  <>
    <Grommet plain>
      <Box pad="medium">
        <p>Plain Grommet</p>
      </Box>
    </Grommet>
    <Grommet>
      <Box pad="medium">
        <p>Not plain Grommet</p>
      </Box>
    </Grommet>
  </>
);

export default {
  title: 'Utilities/Grommet/Plain',
};
