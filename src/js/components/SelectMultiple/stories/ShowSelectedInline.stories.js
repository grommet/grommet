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

export const ShowSelectedInline = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [valueMultiple, setValueMultiple] = useState([]);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" pad="large" gap="large">
      <Text>SelectMultiple showSelectedInline</Text>
      <SelectMultiple
        showSelectedInline
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
        value={valueMultiple}
        onChange={({ value }) => {
          setValueMultiple(value);
        }}
      />
    </Box>
    // </Grommet>
  );
};

ShowSelectedInline.storyName = 'showSelectedInline';

ShowSelectedInline.parameters = {
  chromatic: { disable: true },
};

ShowSelectedInline.args = {
  full: true,
};

export default {
  title: 'Input/SelectMultiple/showSelectedInline',
};
