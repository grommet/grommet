import React from 'react';

import { Box, CheckBoxGroup, Grommet, Text } from 'grommet';

export const Disabled = () => (
  <Grommet
    theme={{ global: { control: { disabled: { cursor: 'not-allowed' } } } }}
  >
    <Box pad="medium" gap="large">
      <Box>
        <Text margin={{ vertical: 'small' }}>Disabled Group</Text>
        <CheckBoxGroup disabled options={['First', 'Second', 'Third']} />
      </Box>
      <Box>
        <Text margin={{ vertical: 'small' }}> Disabled Individuals</Text>
        <CheckBoxGroup
          name="destinations"
          valueKey="id"
          aria-labelledby="drink-formfield-id"
          options={[
            { label: 'Maui', id: '1', disabled: true },
            { label: 'Jerusalem', id: '2' },
            { label: 'Wuhan', id: '3', disabled: true },
          ]}
        />
      </Box>
    </Box>
  </Grommet>
);

export default {
  title: 'Input/CheckBoxGroup/Disabled',
};
