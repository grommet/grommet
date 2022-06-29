import React, { useState } from 'react';

import { Box, CheckBox, Select, Text } from 'grommet';

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

export const MultiSelectLimited = () => {
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
    <Box fill align="center" pad="large" gap="large">
      <Text>Multi-Select with selection limit</Text>
      <Select
        limitedSelections
        width="medium"
        multiple
        closeOnChange={false}
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
          setValueMultiple(value);
        }}
      >
        {(option) => <Option option={option} />}
      </Select>
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Input/Select/Multi Select Limited',
};
