import React, { useState } from 'react';

import { Box, CheckBox } from 'grommet';

export const Indeterminate = () => {
  const [checked, setChecked] = useState([]);
  const checkboxes = ['fruits', 'vegetables', 'olive oil'];

  const onCheckAll = (event) => {
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
      setChecked(checked.filter((item) => item !== value));
    }
  };

  return (
    <Box align="center" pad="large">
      <Box direction="row" gap="medium">
        <CheckBox
          checked={checked.length === 3}
          indeterminate={checked.length > 0 && checked.length < 3}
          label="All"
          onChange={onCheckAll}
        />
        {checkboxes.map((item) => (
          <CheckBox
            key={item}
            checked={checked.includes(item)}
            label={item}
            onChange={(e) => onCheck(e, item)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default {
  title: 'Input/CheckBox/Indeterminate',
};
