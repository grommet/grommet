import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';

const IndeterminateCheckBox = () => {
  const [checked, setChecked] = useState([]);
  const checkboxes = ['fruits', 'vegetables', 'olive oil'];

  const onCheckAll = event => {
    if (event.target.checked) {
      setChecked(checkboxes);
    } else {
      setChecked([]);
    }
  };

  const onCheck = (event, value) => {
    if (event.target.checked) {
      setChecked([...checked, value]);
    } else {
      setChecked(checked.filter(item => item !== value));
    }
  };

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Box direction="row" gap="medium">
          <CheckBox
            checked={checked.length === 3}
            indeterminate={checked.length > 0 && checked.length < 3}
            label="All"
            onChange={onCheckAll}
          />
          {checkboxes.map(item => (
            <CheckBox
              key={item}
              checked={checked.includes(item)}
              label={item}
              onChange={e => onCheck(e, item)}
            />
          ))}
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('CheckBox', module).add('Indeterminate', () => (
  <IndeterminateCheckBox />
));
