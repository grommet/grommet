import React from 'react';

import { Box, Button, Grommet, RangeInput } from 'grommet';

import { Add, Subtract } from 'grommet-icons';

const rangeInputTheme = {
  rangeInput: {
    track: {
      height: '10px',
      upper: {
        color: 'dark-4',
        opacity: 0.3,
      },
      colors: [
        { value: 3, color: '#FF0000', opacity: '0.8' },
        { value: 7, color: '#FFFF00', opacity: '0.6' },
        { value: 10, color: '#00FF00', opacity: '0.6' },
      ],
    },
    label: {
      extend: {
        color: '#7D4CDB',
      },
    },
  },
  box: {
    extend: {
      position: 'relative',
    },
  },
};

export const MultiColorTrack = () => {
  const [value, setValue] = React.useState(3);
  const [isAddDisabled, setIsAddDisabled] = React.useState();
  const [isSubtractDisabled, setIsSubtractDisabled] = React.useState();

  const onChange = event => setValue(event.target.value);
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
            min={0}
            max={10}
            step={1}
            value={value}
            onChange={onChange}
            showLabel
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

MultiColorTrack.storyName = 'MultiColorTrack';

export default {
  title: 'Input/RangeInput/MultiColorTrack',
};
