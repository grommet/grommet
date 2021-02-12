import React from 'react';

import { grommet, Box, Grommet, Spinner, Text } from 'grommet';
import { Nodes } from 'grommet-icons';

export const Children = () => (
  <Grommet theme={grommet} full>
    <Box align="center" direction="row" gap="small" pad="small">
      <Spinner align="center" justify="center" size="large">
        <Nodes size="large" color="graph-0" />
      </Spinner>
      <Text> Spinner with an icon child</Text>
    </Box>
  </Grommet>
);

export default {
  title: 'Utilities/Spinner/Children',
};
