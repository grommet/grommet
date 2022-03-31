import React, { useState } from 'react';

import { Box, CheckBox } from 'grommet';

const boxStyle = {
  position: 'relative',
  display: 'block',
};
const titleBoxBackground = { color: 'light-2' };
const titleBoxStyle = { position: 'sticky', top: 0 };

const checkboxes = Array(8)
  .fill()
  .map((_, i) => `item ${i + 1}`);

const removeItemFromArray = (array, value) =>
  array.filter((item) => item !== value);

export const WithStickyDiv = () => {
  const [checks, setChecks] = useState([]);
  const onCheck =
    (value) =>
    ({ target }) => {
      if (target.checked) {
        setChecks([...checks, value]);
      } else {
        setChecks(removeItemFromArray(checks, value));
      }
    };

  return (
    <Box pad="large" align="center">
      <Box height="120px" width="120px" overflow="auto" style={boxStyle}>
        <Box background={titleBoxBackground} style={titleBoxStyle}>
          Click &amp; Scroll
        </Box>
        {checkboxes.map((item) => (
          <CheckBox
            key={item}
            checked={checks.includes(item)}
            label={item}
            onChange={onCheck(item)}
          />
        ))}
      </Box>
    </Box>
  );
};

WithStickyDiv.storyName = 'With sticky div';

export default {
  title: 'Input/CheckBox/With sticky div',
};
