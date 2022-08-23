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

export const Variant = () => {
  const [options, setOptions] = useState(dummyOptions.sort());
  const [valueMultiple, setValueMultiple] = useState([]);
  const [open, setOpen] = useState(false);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" pad="large" gap="large">
      <Text>SelectMultiple Variant</Text>
      <MultiSelect
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
          let sortedOptions = dummyOptions.filter((i) => !next.includes(i));

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
          const sortedOptions = dummyOptions.filter((i) => !next.includes(i));
          next = next.filter((i) => dummyOptions.includes(i));
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
          const sortedOptions = dummyOptions.filter((i) => !next.includes(i));

          next = next.filter((i) => dummyOptions.includes(i));
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

Variant.parameters = {
  chromatic: { disable: true },
};

Variant.args = {
  full: true,
};

export default {
  title: 'Input/MultiSelect/Variant',
};
