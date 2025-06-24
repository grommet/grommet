import React, { useState } from 'react';

import { Box, RadioButtonGroup } from 'grommet';
import { Ascend, Descend } from 'grommet-icons';
import styled from 'styled-components';
import { focusStyle, useKeyboard } from 'grommet/utils';

const StyledRadioChild = styled(Box)`
  ${(props) => props.focus && props.keyboard && focusStyle()}
`;

export const Children = () => {
  const [value, setValue] = useState();
  const usingKeyboard = useKeyboard();

  return (
    <Box align="center" pad="large">
      <RadioButtonGroup
        name="radio"
        direction="row"
        gap="xsmall"
        options={['asc', 'desc']}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        {(option, { checked, focus, hover }) => {
          const Icon = option === 'asc' ? Ascend : Descend;
          let background;
          if (checked) background = 'brand';
          else if (hover) background = 'light-4';
          else if (focus) background = 'light-4';
          else background = 'light-2';
          return (
            <StyledRadioChild
              focus={focus}
              keyboard={usingKeyboard}
              background={background}
              pad="xsmall"
            >
              <Icon />
            </StyledRadioChild>
          );
        }}
      </RadioButtonGroup>
    </Box>
  );
};

export default {
  title: 'Input/RadioButtonGroup/Children',
};
