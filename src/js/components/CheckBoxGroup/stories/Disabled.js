import React from 'react';

import { Box, CheckBoxGroup, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export const Disabled = () => (
  <Grommet theme={grommet}>
    <Box pad="medium" gap="large">
      <Box>
        <Text margin={{ vertical: 'small' }}>Disabled Group</Text>
        <CheckBoxGroup disabled options={['First', 'Second', 'Third']} />
      </Box>
      <Box>
        <Text margin={{ vertical: 'small' }}> Disabled Individuals</Text>
        <CheckBoxGroup
          options={[
            { label: 'Maui', disabled: true },
            { label: 'Jerusalem' },
            { label: 'Wuhan', disabled: true },
          ]}
        />
      </Box>
    </Box>
  </Grommet>
);

export default {
  title: 'Input/CheckBoxGroup/Disabled',
};
