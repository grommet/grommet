import React, { useState } from 'react';

import { Box, CheckBox } from 'grommet';

const SimpleCheckBox = ({ checked: checkedProp, ...rest }) => {
  const [checked, setChecked] = useState(!!checkedProp);
  const onChange = (event) => setChecked(event.target.checked);

  return (
    <Box align="center" pad="large">
      <CheckBox {...rest} checked={checked} onChange={onChange} />
    </Box>
  );
};

export const NoLabel = () => (
  <SimpleCheckBox a11yTitle="Checkbox without a label" />
);

NoLabel.storyName = 'No label';

export default {
  title: 'Input/CheckBox/No label',
};
