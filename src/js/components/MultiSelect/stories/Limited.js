import React, { useState } from 'react';

import { Box, CheckBox, MultiSelect, Text, Button } from 'grommet';

// const dummyOptions = [
//   'Azure MAS-TRM:v2019.03',
//   'Azure NZISM:v3.2Azure NZISM:v3.2',
//   'Azure NIST800-53:R4',
//   'Azure NZISM:v3.3',
//   'Azure IS027001:2013',
//   'Azure PCI-DSS:v3.2.1',
//   'Pavlo DEFAULT:v1',
//   'Azure Security Health Check:v2.0',
//   'Butterfly:v1.0',
//   'KStadnyk:v1.0',
// ];

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
  const [search, setSearch] = useState();
  const [disabled, setDisabled] = useState([]);

  //   const Option = React.memo(({ option }) => (
  //     <Box direction="row" align="center">
  //       <CheckBox
  //         pad="xsmall"
  //         tabIndex="-1"
  //         checked={valueMultiple.some((i) => i === option)}
  //         onChange={() => {}}
  //         disabled={
  //           !valueMultiple.some((i) => i === option) && disabled.length !== 0
  //         }
  //         label={option}
  //       />
  //     </Box>
  //   ));

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
        disabled={disabled}
        value={valueMultiple}
        placeholder="Select"
        options={options}
        // onSearch={(text) => {
        //   setSearch(text);
        //   // The line below escapes regular expression special characters:
        //   // [ \ ^ $ . | ? * + ( )
        //   const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

        //   // Create the regular expression with modified value which
        //   // handles escaping special characters. Without escaping special
        //   // characters, errors will appear in the console
        //   const exp = new RegExp(escapedText, 'i');

        //   let next = [...valueMultiple];
        //   next = next.filter((o) => exp.test(o));
        //   let sortedOptions = dummyOptions.filter((i) => !next.includes(i));

        //   sortedOptions = sortedOptions.filter((o) => exp.test(o));

        //   const sortedAllOptions = next.concat(sortedOptions);
        //   setOptions(sortedAllOptions);
        // }}
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
          // if (value.length <= 5)
          setValueMultiple(value);
          // if (value.length === 5)
          //   setDisabled(dummyOptions.filter((i) => !value.includes(i)));
          // else setDisabled([]);
        }}
      >
        {/* {(option) => <Option option={option} />} */}
      </MultiSelect>
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
