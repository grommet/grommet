import React from 'react';

import { Box, Text, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

const Option = React.memo(({ label, isFooter }) => (
  <>
    {isFooter ? (
      <Box border="top">
        <Text margin="small">{label}</Text>
      </Box>
    ) : (
      <Box margin="small">{label}</Box>
    )}
  </>
));

const volumeOptions = Array(6)
  .fill()
  .map((_, i) => `volume ${i}`);

// Adding the footer option
volumeOptions.push('Type the volume name to refine your search');

export const FooterOption = () => {
  const [value, setValue] = React.useState([]);

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Select
          placeholder="See footer option..."
          value={value}
          options={volumeOptions}
          onChange={({ option }) => setValue(option)}
          disabled={[volumeOptions.length - 1]}
        >
          {(option, index) => (
            <Option
              label={option}
              isFooter={index === volumeOptions.length - 1}
            />
          )}
        </Select>
      </Box>
    </Grommet>
  );
};

FooterOption.story = {
  name: 'Footer option',
  parameters: {
    chromatic: { disable: true },
  },
};
