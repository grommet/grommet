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

export const CustomMessages = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [valueMultiple, setValueMultiple] = useState([]);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" pad="large" gap="large">
      <Text>SelectMultiple Custom messages</Text>
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
        messages={{
          clearAll: 'Clear ALL!',
          selectAll: 'Select ALL!',
          selected: '{selected} SELECTED',
          summarizedValue: '{selected} of {total} SELECTED',
        }}
      />
    </Box>
    // </Grommet>
  );
};

CustomMessages.parameters = {
  chromatic: { disable: true },
};

CustomMessages.args = {
  full: true,
};

export default {
  title: 'Input/SelectMultiple/CustomMessages',
};
