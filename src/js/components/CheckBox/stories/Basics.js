import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, CheckBox } from 'mnet-ui-base';

const SimpleCheckBox = ({ checked: checkedProp, ...rest }) => {
  const [checked, setChecked] = useState(!!checkedProp);
  const onChange = event => setChecked(event.target.checked);

  return (
    <>
      <Box align="center" pad="large">
        <CheckBox {...rest} checked={checked} onChange={onChange} />
      </Box>
    </>
  );
};

storiesOf('CheckBox', module)
  .add('Simple', () => <SimpleCheckBox label="Choice" />)
  .add('Toggle', () => <SimpleCheckBox label="Choice" toggle />)
  .add('Disabled', () => <SimpleCheckBox label="Choice" checked disabled />)
  .add('Reverse', () => <SimpleCheckBox label="Choice" reverse />)
  .add('No Label', () => <SimpleCheckBox />);
