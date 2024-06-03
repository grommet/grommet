import React, { useEffect } from 'react';

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
  const [value, setValue] = React.useState(0);
  const [isAddDisabled, setIsAddDisabled] = React.useState();
  const [isSubtractDisabled, setIsSubtractDisabled] = React.useState();

  useEffect(() => {
    if (value <= -5) {
      setIsSubtractDisabled(true);
    } else if (value >= 5) {
      setIsAddDisabled(true);
    } else {
      setIsSubtractDisabled(false);
      setIsAddDisabled(false);
    }
  }, [value])

  const onChange = (event) => setValue(event.target.value);
  return (
    <Grommet theme={rangeInputTheme}>
      <Box direction="row" align="center" pad="large" gap="small">
        <Button
          plain={false}
          disabled={isSubtractDisabled}
          icon={<Subtract color="neutral-2" />}
          onClick={() => setValue((prev) => prev - 1)}
        />
        <Box align="center" width="medium">
          <RangeInput
            a11yTitle="Select range value"
            min={-5}
            max={5}
            step={1}
            value={value}
            onChange={onChange}
          />
        </Box>
        <Button
          plain={false}
          disabled={isAddDisabled}
          icon={<Add color="neutral-2" />}
          onClick={() => setValue((prev) => prev + 1)}
        />
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Input/RangeInput/Custom Themed/Bounds',
};
