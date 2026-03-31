import React, { useState } from 'react';

import { Box, Text } from 'grommet';
import { SelectMultiple } from '../SelectMultiple';

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

export const Default = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [valueMultiple, setValueMultiple] = useState([]);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" pad="large" gap="large">
      <Text>SelectMultiple Default</Text>
      <SelectMultiple
        value={valueMultiple}
        placeholder="Select"
        options={options}
        onSearch={(text) => {
          // The line below escapes regular expression special characters:
          // [ \ ^ $ . | ? * + ( )
          const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

          // Create the regular expression with modified value which
          // handles escaping special characters. Without escaping special
          // characters, errors will appear in the console
          const exp = new RegExp(escapedText, 'i');
          setOptions(defaultOptions.filter((o) => exp.test(o)));
        }}
        onClose={() => setOptions(defaultOptions)}
        onChange={({ value }) => {
          setValueMultiple(value);
        }}
      />
    </Box>
    // </Grommet>
  );
};

Default.parameters = {
  chromatic: { disable: true },
};

Default.args = {
  full: true,
};

export default {
  title: 'Input/SelectMultiple/Default',
};
