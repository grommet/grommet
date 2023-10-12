import React, { useState } from 'react';

import { Box, Button, CheckBox, Text } from 'grommet';

export const InsideButton = () => {
  const [checked, setChecked] = useState(false);
  const onButtonClick = () => setChecked(!checked);
  const onCheckboxChange = () => {};

  return (
    <Box align="center" pad="large">
      <Button hoverIndicator="background" onClick={onButtonClick}>
        <CheckBox
          tabIndex="-1"
          checked={checked}
          label={<Text>Hi</Text>}
          onChange={onCheckboxChange}
        />
      </Button>
    </Box>
  );
};

InsideButton.storyName = 'Inside a Button';

InsideButton.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/CheckBox/Inside a Button',
};
