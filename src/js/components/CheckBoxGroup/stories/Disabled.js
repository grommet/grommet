import React from 'react';

import { Box, CheckBoxGroup, Text } from 'grommet';

export const Disabled = () => (
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
);

export default {
  title: 'Input/CheckBoxGroup/Disabled',
};
