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
          value={value}
          onChange={event => setValue(event.value)}
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
          value={value2}
          onChange={({ value: nextValue, option }) => {
            console.log('nextValue: ', nextValue);
            console.log('option: ', option);
            setValue2(nextValue);
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
