import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, CheckBoxGroup, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => {
  const [value, setValue] = useState(['First', 'Second']);
  const [value2, setValue2] = useState(['M']);

  return (
    <Grommet theme={grommet}>
      <Box pad="medium" gap="large">
        Initial value via options object:
        <CheckBoxGroup
          checked={value}
          onChange={event => setValue(event.checked)}
          options={['First', 'Second', 'Third']}
        />
        Initial value via options object:
        <CheckBoxGroup
          options={[
            { label: 'Maui', id: '1', checked: true },
            { label: 'Jerusalem', id: '2' },
            { label: 'Wuhan', id: '3' },
          ]}
        />
        Initial value via controlled options object:
        <CheckBoxGroup
          labelKey="label"
          valueKey="id"
          checked={value2}
          onChange={({ checked, option }) => {
            console.log('checked: ', checked);
            console.log('option: ', option);
            setValue2(checked);
          }}
          options={[
            { label: 'Maui', id: 'M' },
            { label: 'Jerusalem', id: 'J' },
            { label: 'Wuhan', id: 'W' },
          ]}
        />
      </Box>
    </Grommet>
  );
};

storiesOf('CheckBoxGroup', module).add('Initial value', () => <Example />);
