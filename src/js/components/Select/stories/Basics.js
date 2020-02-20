import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const colors = {
  selected: 'neutral-3',
};

const customRoundedTheme = deepMerge(grommet, {
  global: {
    colors,
    control: {
      border: {
        radius: '24px',
      },
    },
    input: {
      weight: 400,
    },
    font: {
      size: '12px',
    },
  },
  text: {
    medium: '13px',
  },
  textInput: {
    extend: 'padding: 0 12px;',
  },
  select: {
    control: {
      extend: 'padding: 3px 6px;',
      open: {
        background: '#ece0fa',
        border: '1px solid #7D4CDB',
      },
    },
  },
});

const SimpleSelect = ({ theme, ...rest }) => {
  const options = ['one', 'two'];
  const [value, setValue] = useState('');
  return (
    <Grommet full theme={theme || grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Select
          id="select"
          name="select"
          placeholder="Select"
          value={value}
          options={options}
          onChange={({ option }) => setValue(option)}
          {...rest}
        />
      </Box>
    </Grommet>
  );
};

SimpleSelect.propTypes = {
  theme: PropTypes.shape({}),
};

SimpleSelect.defaultProps = {
  theme: undefined,
};

const defaultOptions = [];
const objectOptions = [];
for (let i = 1; i <= 200; i += 1) {
  defaultOptions.push(`option ${i}`);
  objectOptions.push({
    lab: `option ${i}`,
    val: i,
    dis: i % 5 === 0,
    sel: i % 13 === 0,
  });
}

storiesOf('Select', module)
  .add('Simple', () => <SimpleSelect />)
  .add('Custom Theme', () => <SimpleSelect open theme={customRoundedTheme} />);
