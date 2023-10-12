import React from 'react';

import { Box, Button, Grommet, RangeInput } from 'grommet';

import { Add, Subtract } from 'grommet-icons';

const rangeInputTheme = {
  rangeInput: {
    track: {
      height: '10px',
      lower: {
        color: 'brand',
        opacity: 0.7,
      },
      upper: {
        color: 'dark-4',
        opacity: 0.3,
      },
    },
  },
};

export const Bounds = () => {
  const [value, setValue] = React.useState(3);
  const [isAddDisabled, setIsAddDisabled] = React.useState();
  const [isSubtractDisabled, setIsSubtractDisabled] = React.useState();

  const onChange = (event) => setValue(event.target.value);
  return (
    <Grommet theme={rangeInputTheme}>
      <Box direction="row" align="center" pad="large" gap="small">
        <Button
          plain={false}
          disabled={isSubtractDisabled}
          icon={<Subtract color="neutral-2" />}
          onClick={() => {
            if (value > 0) {
              setIsAddDisabled(false);
              setValue(value - 1);
            } else setIsSubtractDisabled(true);
          }}
        />
        <Box align="center" width="medium">
          <RangeInput
            a11yTitle="Select range value"
            min={0}
            max={10}
            step={1}
            value={value}
            onChange={onChange}
          />
        </Box>
        <Button
          plain={false}
          disabled={isAddDisabled}
          icon={<Add color="neutral-2" />}
          onClick={() => {
            if (value < 10) {
              setIsSubtractDisabled(false);
              setValue(value + 1);
            } else setIsAddDisabled(true);
          }}
        />
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Input/RangeInput/Custom Themed/Bounds',
};
