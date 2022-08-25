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
  const [options, setOptions] = useState(defaultOptions.sort());
  const [valueMultiple, setValueMultiple] = useState([]);
  const [open, setOpen] = useState(false);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" pad="large" gap="large">
      <Text>SelectMultiple Variant</Text>
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

          let next = [...valueMultiple];
          next = next.filter((o) => exp.test(o));
          let sortedOptions = defaultOptions.filter((i) => !next.includes(i));

          sortedOptions = sortedOptions.filter((o) => exp.test(o));

          const sortedAllOptions = next.concat(sortedOptions);
          setOptions(sortedAllOptions);
        }}
        value={valueMultiple}
        open={open}
        onOpen={() => {
          // setValueMultiple(intermediateValue);
          setOpen(true);
          let next = [...valueMultiple];
          next.sort();
          const sortedOptions = defaultOptions.filter((i) => !next.includes(i));
          next = next.filter((i) => defaultOptions.includes(i));
          sortedOptions.sort();
          const sortedAllOptions = next.concat(sortedOptions);
          setOptions(sortedAllOptions);
        }}
        onClose={() => {
          // setIntermediateValue(valueMultiple);
          setOpen(false);
          let next = [...valueMultiple];
          // loop through next selected and sort alphabetically
          next.sort();
          // remove next selected from options
          const sortedOptions = defaultOptions.filter((i) => !next.includes(i));

          next = next.filter((i) => defaultOptions.includes(i));
          next.sort();
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

ShowSelectedInline.parameters = {
  chromatic: { disable: true },
};

ShowSelectedInline.args = {
  full: true,
};

export default {
  title: 'Input/SelectMultiple/ShowSelectedInline',
};
