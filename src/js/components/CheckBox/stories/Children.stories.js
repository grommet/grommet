import React from 'react';

import { Box, CheckBox } from 'grommet';
import { Ascend } from 'grommet-icons';

export const Children = () => {
  const [checkedState, setChecked] = React.useState(false);

  return (
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
  );
};

export default {
  title: 'Input/CheckBox/Children',
};
