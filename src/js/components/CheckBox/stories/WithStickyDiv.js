import { Box, CheckBox, Grommet } from 'grommet';
import React, { useState } from 'react';

import { grommet } from 'grommet/themes';
import { storiesOf } from '@storybook/react';

const boxStyle = {
  position: 'relative',
  display: 'block',
};
const titleBoxBackground = { color: 'neutral-1' };
const titleBoxStyle = { position: 'sticky', top: 0 };

const checkboxes = Array(8)
  .fill()
  .map((_, i) => `item ${i + 1}`);

const removeItemFromArray = (array, value) =>
  array.filter(item => item !== value);

const CheckBoxWithStickyDiv = () => {
  const [checks, setChecks] = useState([]);
  const onCheck = value => ({ target }) => {
    if (target.checked) {
      setChecks([...checks, value]);
    } else {
      setChecks(removeItemFromArray(checks, value));
    }
  };

  return (
    <Grommet theme={grommet}>
      <Box pad="large" align="center">
        <Box height="120px" width="120px" overflow="auto" style={boxStyle}>
          <Box background={titleBoxBackground} style={titleBoxStyle}>
            Click &amp; Scroll
          </Box>
          {checkboxes.map(item => (
            <CheckBox
              key={item}
              checked={checks.includes(item)}
              label={item}
              onChange={onCheck(item)}
            />
          ))}
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('CheckBox', module).add('With Sticky Div', () => (
  <CheckBoxWithStickyDiv />
));
