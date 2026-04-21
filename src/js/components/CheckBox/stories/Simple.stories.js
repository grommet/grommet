import React, { useState } from 'react';

import { Box, CheckBox } from 'grommet';

const SimpleCheckBox = ({ checked: checkedProp, ...rest }) => {
  const [checked, setChecked] = useState(!!checkedProp);
  const onChange = (event) => setChecked(event.target.checked);

  return (
    <Box gap="small" align="center" pad="large">
      <CheckBox {...rest} checked={checked} onChange={onChange} />
    </Box>
  );
};

export const Simple = () => (
  <>
    <SimpleCheckBox label="Reversed Checkbox" reverse />
    <SimpleCheckBox label="Disabled Checkbox" checked disabled />
  </>
);

export default {
  title: 'Input/CheckBox/Simple',
};
