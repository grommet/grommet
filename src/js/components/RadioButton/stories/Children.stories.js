import React from 'react';

import { Box, Button, RadioButton } from 'grommet';
import { Ascend } from 'grommet-icons';
import styled from 'styled-components';
import { focusStyle, useKeyboard } from 'grommet/utils';

const StyledRadioChild = styled(Box)`
  ${(props) => props.focus && props.keyboard && focusStyle()}
`;

export const Children = () => {
  const [selected, setSelected] = React.useState();
  const usingKeyboard = useKeyboard();

  return (
    <Box align="center" pad="large" gap="large">
      <RadioButton
        name="name"
        value="option 1"
        checked={selected === 'option 1'}
        onChange={(event) => setSelected(event.target.value)}
      >
        {({ checked, focus }) => (
          <StyledRadioChild focus={focus} keyboard={usingKeyboard}>
            <Ascend color={checked ? 'brand' : 'status-unknown'} />
          </StyledRadioChild>
        )}
      </RadioButton>

      <Button label="clear" onClick={() => setSelected(undefined)} />
    </Box>
  );
};

export default {
  title: 'Input/RadioButton/Children',
};
