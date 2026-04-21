import React, { useState } from 'react';

import { Box, SelectMultiple, Text } from 'grommet';

const defaultOptions = [
  'Apple',
  'Orange',
  'Banana',
  'Grape',
  'Melon',
  'Strawberry',
  'Kiwi',
  'Mango',
  'Raspberry',
  'Rhubarb',
];

export const SelectMultipleLimited = () => {
  const [valueMultiple, setValueMultiple] = useState([]);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" pad="large" gap="large">
      <Text>SelectMultiple Limited</Text>
      <SelectMultiple
        limit={5}
        help={
          <Box
            direction="row"
            justify="between"
            flex={false}
            pad={{ horizontal: 'xsmall', bottom: 'xsmall' }}
          >
            <Text size="small">Select up to 5</Text>
          </Box>
        }
        value={valueMultiple}
        placeholder="Select"
        options={defaultOptions}
        onChange={({ value }) => {
          setValueMultiple(value);
        }}
      />
    </Box>
    // </Grommet>
  );
};

SelectMultipleLimited.parameters = {
  chromatic: { disable: true },
};

SelectMultipleLimited.args = {
  full: true,
};

SelectMultipleLimited.storyName = 'Limited';

export default {
  title: 'Input/SelectMultiple/Limited',
};
