import React, { useState } from 'react';

import { Box, CheckBox, Select, Text, Button } from 'grommet';

import { Checkmark } from 'grommet-icons';

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

  const Option = React.memo(({ option }) => (
    <Box direction="row" align="center">
      <CheckBox
        pad="xsmall"
        tabIndex="-1"
        checked={valueMultiple.some((i) => i === option)}
        onChange={() => {}}
        disabled={
          !valueMultiple.some((i) => i === option) && disabled.length !== 0
        }
        label={option}
      />
    </Box>
  ));

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" pad="large" gap="large">
      <Text>Multi-Select Limited</Text>
      <Select
        contentAboveSearch={
          <Box
            direction="row"
            justify="between"
            flex={false}
            pad={{ horizontal: 'small', top: 'xsmall' }}
          >
            <Text size="small">Select up to 5</Text>
            {search !== '' && search !== undefined && (
              <Box>
                {valueMultiple.length === 0 ? (
                  <Text size="small">0 selected</Text>
                ) : (
                  <Text size="small" color="text-weak">
                    {valueMultiple.length} of 10 selected
                  </Text>
                )}
              </Box>
            )}
          </Box>
        }
        contentBelowSearch={
          (search === '' || search === undefined) && (
            <Box
              pad={{ horizontal: 'xsmall', top: 'xsmall', bottom: 'xsmall' }}
              direction="row"
              justify="between"
              gap="small"
            >
              <Box alignSelf="center">
                {valueMultiple.length === 0 ? (
                  <Text size="small">0 selected</Text>
                ) : (
                  <Text size="small">
                    {valueMultiple.length} selected of {dummyOptions.length}
                  </Text>
                )}
              </Box>
              <Box>
                {options.length > 0 &&
                  (valueMultiple.length === 0 ? (
                    <Button
                      icon={<Checkmark size="small" />}
                      label="Select All"
                      onClick={() => setValueMultiple(dummyOptions)}
                    />
                  ) : (
                    <Button
                      label="Clear All"
                      onClick={() => setValueMultiple([])}
                    />
                  ))}
              </Box>
            </Box>
          )
        }
        disabled={disabled}
        value={valueMultiple}
        multiple
        closeOnChange={false}
        placeholder="Select"
        options={options}
        onSearch={(text) => {
          setSearch(text);
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
          if (value.length <= 5) setValueMultiple(value);
          if (value.length === 5)
            setDisabled(dummyOptions.filter((i) => !value.includes(i)));
          else setDisabled([]);
        }}
      >
        {(option) => <Option option={option} />}
      </Select>
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

MultiSelectLimited.storyName = 'Multi Select Limited';

export default {
  title: 'Input/Select/Multi Select Limited',
};
