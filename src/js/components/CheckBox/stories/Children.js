import React from 'react';

import { Grommet, Box, CheckBox } from 'grommet';
import { Ascend } from 'grommet-icons';
import { grommet } from 'grommet/themes';

export const Children = () => {
  const [checkedState, setChecked] = React.useState(false);

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large" gap="large">
        <CheckBox
          name="name"
          value="option 1"
          checked={checkedState}
          onChange={(event) => setChecked(event.target.checked)}
        >
          {({ checked }) => (
            <Ascend color={checked ? 'brand' : 'status-unknown'} />
          )}
        </CheckBox>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Input/CheckBox/Children',
};
