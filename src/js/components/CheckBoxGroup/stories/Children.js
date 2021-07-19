import React, { useState } from 'react';

import { Box, Grommet, CheckBoxGroup } from 'grommet';
import { grommet } from 'grommet/themes';
import { Ascend, Descend } from 'grommet-icons';

export const Children = () => {
  const [value, setValue] = useState();

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <CheckBoxGroup
          name="checkbox"
          direction="row"
          gap="xsmall"
          options={['asc', 'desc']}
          value={value}
          onChange={({ value: nextValue }) => setValue(nextValue)}
        >
          {(option, { checked }) => {
            const Icon = option === 'asc' ? Ascend : Descend;
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
    </Grommet>
  );
};

export default {
  title: 'Input/CheckBoxGroup/Children',
};
