import React, { useState } from 'react';

import { Box, Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';

const SimpleCheckBox = ({ checked: checkedProp, ...rest }) => {
  const [checked, setChecked] = useState(!!checkedProp);
  const onChange = event => setChecked(event.target.checked);

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <CheckBox {...rest} checked={checked} onChange={onChange} />
      </Box>
    </Grommet>
  );
};

export const Simple = () => <SimpleCheckBox label="Choice" />;

export const Toggle = () => <SimpleCheckBox label="Choice" toggle />;

export const Disabled = () => (
  <SimpleCheckBox label="Choice" checked disabled />
);

export const Reverse = () => <SimpleCheckBox label="Choice" reverse />;

export const NoLabel = () => <SimpleCheckBox />;

NoLabel.storyName = 'No label';
