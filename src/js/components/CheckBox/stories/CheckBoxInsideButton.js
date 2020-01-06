import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, CheckBox, MnetUIBase, Text } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const CheckBoxInsideButton = () => {
  const [checked, setChecked] = useState(false);
  const onButtonClick = () => setChecked(!checked);
  const onCheckboxChange = () => {};

  return (
    <MnetUIBase theme={mnet}>
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
    </MnetUIBase>
  );
};

storiesOf('CheckBox', module).add('Inside a Button', () => (
  <CheckBoxInsideButton />
));
