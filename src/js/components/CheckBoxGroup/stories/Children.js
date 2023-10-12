import React, { useState } from 'react';

import { Box, CheckBoxGroup } from 'grommet';
import { Ascend, Descend } from 'grommet-icons';

const optionsObjects = [
  {
    label: 'asc',
    disabled: true,
    value: 'asc',
  },
  {
    label: 'desc',
    value: 'desc',
  },
];

export const Children = () => {
  const [value, setValue] = useState();

  return (
    <Box align="center" pad="large">
      <CheckBoxGroup
        name="checkbox"
        direction="row"
        gap="xsmall"
        options={optionsObjects}
        value={value}
        onChange={({ value: nextValue }) => setValue(nextValue)}
      >
        {(option, { checked }) => {
          const Icon = option.value === 'asc' ? Ascend : Descend;
          let background;
          if (checked) background = 'brand';
          else background = 'light-2';
          return (
            <Box background={background} pad="xsmall">
              <Icon />
            </Box>
          );
        }}
      </CheckBoxGroup>
    </Box>
  );
};

export default {
  title: 'Input/CheckBoxGroup/Children',
};
