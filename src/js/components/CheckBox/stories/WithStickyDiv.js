import { Box, CheckBox, Grommet } from 'grommet';
import React, { useState } from 'react';

import { grommet } from 'grommet/themes';
import { storiesOf } from '@storybook/react';

const boxBackground = { color: 'neutral-1' };
const boxStyle = { position: 'sticky', top: 0 };

const checkboxes = Array(8)
  .fill()
  .map((_, i) => `item ${i + 1}`);

const removeItemFromArray = (array, value) =>
  array.filter(item => item !== value);

const getChecks = ({ target }, checked, value) => {
  if (target.checked) {
    return [...checked, value];
  }
  return removeItemFromArray(checked, value);
};

const CheckBoxWithStickyDiv = () => {
  const [checks, setChecks] = useState([]);
  const onCheck = value => event => setChecks(getChecks(event, checks, value));

  return (
    <Grommet theme={grommet}>
      <Box pad="large" align="center">
        <Box
          height="120px"
          width="120px"
          overflow="auto"
          style={{
            position: 'relative',
            display: 'block',
          }}
        >
          <Box background={boxBackground} style={boxStyle}>
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
