import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, CheckBoxGroup, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const Disabled = () => {
  return (
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
              { label: 'Maui', disabled: true, checked: true },
              { label: 'Jerusalem' },
              { label: 'Wuhan', disabled: true },
            ]}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('CheckBoxGroup', module).add('Disabled', () => <Disabled />);
