import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, RadioButtonGroup, ThemeContext } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';
import { deepMerge } from 'mnet-ui-base/utils';

const customTheme = deepMerge(mnet, {
  radioButton: {
    border: {
      color: 'red',
      width: '10px',
    },
    hover: {
      border: {
        color: 'blue',
      },
    },
    size: '100px', // affects the size of the outer circle
    icon: {
      size: '20px', // affects the size of the inner circle
    },
    check: {
      radius: '20%',
    },
  },
});

const CustomRadioButtomGroup = ({ value: initialValue, ...props }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <MnetUIBase theme={customTheme}>
      <ThemeContext.Consumer>
        {theme => console.log(JSON.stringify(theme.radioButton))}
      </ThemeContext.Consumer>
      <Box align="center" pad="large">
        <RadioButtonGroup
          name="radio"
          options={[
            { label: 'Choice 1', value: 'c1' },
            { label: 'Choice 2', value: 'c2' },
            { label: 'Choice 3', value: 'c3' },
          ]}
          value={value}
          onChange={event => setValue(event.target.value)}
          {...props}
        />
      </Box>
    </MnetUIBase>
  );
};

storiesOf('RadioButtonGroup', module).add('Custom Theme', () => (
  <CustomRadioButtomGroup />
));
