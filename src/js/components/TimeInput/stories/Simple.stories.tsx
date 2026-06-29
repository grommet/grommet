import React from 'react';
import type { Meta } from '@storybook/react';

import { Box, TimeInput } from 'grommet';

export const Simple = () => {
  const [value, setValue] = React.useState('');
  const onChange = ({ value: nextValue }) => {
    setValue(nextValue);
  };

  return (
    <Box align="center" justify="center" pad="large">
      <Box width="medium">
        <TimeInput value={value} onChange={onChange} />
      </Box>
    </Box>
  );
};

Simple.storyName = 'Simple';

Simple.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/TimeInput',
  id: 'input-timeinput-simple',
} satisfies Meta;
