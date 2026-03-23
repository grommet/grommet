import React, { useState } from 'react';

import { Box, CheckBoxGroup } from 'grommet';

export const InitialValues = () => {
  const [value, setValue] = useState(['First', 'Second']);
  const [value2, setValue2] = useState(['M']);

  return (
    <Box pad="medium" gap="large">
      Initial value via options object:
      <CheckBoxGroup
        value={value}
        onChange={(event) => {
          console.log('value: ', event.value);
          console.log('option: ', event.option);
          setValue(event.value);
        }}
        options={['First', 'Second', 'Third']}
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
  );
};

InitialValues.storyName = 'Initial values';

export default {
  title: 'Input/CheckBoxGroup/Initial values',
};
