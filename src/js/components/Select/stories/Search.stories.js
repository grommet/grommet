import React, { useState } from 'react';

import { Box, Select } from 'grommet';

const defaultOptions = [];
for (let i = 1; i <= 200; i += 1) {
  defaultOptions.push(`option ${i}`);
}

export const Search = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState('');
  const [valueMultiple, setValueMultiple] = useState([]);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box pad="large" gap="medium" direction="row">
      <Select
        size="medium"
        placeholder="Select single option"
        value={value}
        options={options}
        onChange={({ option }) => setValue(option)}
        onClose={() => setOptions(defaultOptions)}
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
      />
      <Select
        multiple
        size="medium"
        placeholder="Select multiple options"
        value={valueMultiple}
        options={options}
        onChange={({ value: nextValue }) => setValueMultiple(nextValue)}
        closeOnChange={false}
        onClose={() => setOptions(defaultOptions)}
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
      />
    </Box>
    // </Grommet>
  );
};

Search.parameters = {
  chromatic: { disable: true },
};

Search.args = {
  full: true,
};

export default {
  title: 'Input/Select/Search',
};
