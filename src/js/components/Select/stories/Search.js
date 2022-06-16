import React, { useState } from 'react';

import { Box, CheckBox, Select } from 'grommet';

// const dummyOptions = Array(20)
//   .fill()
//   .map((_, i) => `option ${i}`)
//   .sort((a, b) =>
//     a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
//   );

const dummyOptions = [
  'Azure MAS-TRM:v2019.03',
  'Azure NZISM:v3.2Azure NZISM:v3.2',
  'Azure NIST800-53:R4',
  'Azure NZISM:v3.3',
  'Azure IS027001:2013',
  'Azure PCI-DSS:v3.2.1',
  'Pavlo DEFAULT:v1',
  'Azure Security Health Check:v2.0',
  'Butterfly:v1.0',
  'KStadnyk:v1.0',
];

export const Search = () => {
  const [options, setOptions] = useState(dummyOptions);
  const [valueMultiple, setValueMultiple] = useState([]);

  const Option = React.memo(({ option }) => (
    <Box direction="row" align="center">
      <CheckBox
        pad="xsmall"
        tabIndex="-1"
        checked={valueMultiple.some((i) => i === option)}
        onChange={() => {}}
      />
      {option}
    </Box>
  ));

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" pad="large">
      <Select
        multiple
        closeOnChange={false}
        placeholder="Select"
        options={options}
        dropHeight="medium"
        onSearch={(text) => {
          // The line below escapes regular expression special characters:
          // [ \ ^ $ . | ? * + ( )
          const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

          // Create the regular expression with modified value which
          // handles escaping special characters. Without escaping special
          // characters, errors will appear in the console
          const exp = new RegExp(escapedText, 'i');
          setOptions(dummyOptions.filter((o) => exp.test(o)));
        }}
        onClose={() =>
          setOptions(
            options.sort((p1, p2) => {
              const p1Exists = valueMultiple.includes(p1);
              const p2Exists = valueMultiple.includes(p2);

              if (!p1Exists && p2Exists) {
                return 1;
              }
              if (p1Exists && !p2Exists) {
                return -1;
              }
              return p1.localeCompare(p2, undefined, {
                numeric: true,
                sensitivity: 'base',
              });
            }),
          )
        }
        onChange={({ value }) => {
          let next = [...value];
          // loop through next selected and sort alphabetically
          next.sort();
          // remove next selected from options
          let sortedOptions = options.filter((i) => {
            return !next.includes(i);
          });
          // sort options alphabetically
          sortedOptions.sort();

          // concat next selected and options
          let sortedAllOptions = next.concat(sortedOptions);
          setOptions(sortedAllOptions);

          setValueMultiple(value);
        }}
      >
        {(option) => <Option option={option} />}
      </Select>
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
