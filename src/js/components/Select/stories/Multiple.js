import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, Select } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const options = ['one', 'two'];

const Example = () => {
  const [value, setValue] = useState(['one']);

  return (
    <MnetUIBase full theme={mnet}>
      <Box fill align="center" justify="start" pad="large">
        <Select
          placeholder="Select"
          multiple
          closeOnChange={false}
          value={value}
          options={options}
          onChange={({ value: nextValue }) => setValue(nextValue)}
        />
      </Box>
    </MnetUIBase>
  );
};

storiesOf('Select', module).add('Multiple', () => <Example />);
