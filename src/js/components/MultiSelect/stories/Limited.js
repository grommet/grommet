import React, { useState } from 'react';

import { Box, MultiSelect, Text } from 'grommet';

const dummyOptions = [
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

export const MultiSelectLimited = () => {
  const [options, setOptions] = useState(dummyOptions.sort());
  const [valueMultiple, setValueMultiple] = useState([]);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" pad="large" gap="large">
      <Text>Multi-Select Limited</Text>
      <MultiSelect
        limit={5}
        helpContent={
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
        options={options}
        onClose={() => {
          let next = [...valueMultiple];
          // loop through next selected and sort alphabetically
          next.sort();
          // remove next selected from options
          const sortedOptions = options.filter((i) => !next.includes(i));

          next = next.filter((i) => options.includes(i));
          // sort options alphabetically
          sortedOptions.sort();

          // concat next selected and options
          const sortedAllOptions = next.concat(sortedOptions);
          setOptions(sortedAllOptions);
        }}
        onChange={({ value }) => {
          setValueMultiple(value);
        }}
      />
    </Box>
    // </Grommet>
  );
};

MultiSelectLimited.parameters = {
  chromatic: { disable: true },
};

MultiSelectLimited.args = {
  full: true,
};

MultiSelectLimited.storyName = 'Limited';

export default {
  title: 'Input/MultiSelect/Limited',
};
