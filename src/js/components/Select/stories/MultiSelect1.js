import React, { useState, useEffect } from 'react';

import { Box, CheckBox, Select, Text, Button } from 'grommet';

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

export const MultiSelect = () => {
  const [options, setOptions] = useState(dummyOptions.sort());
  const [valueMultiple, setValueMultiple] = useState([]);
  const [label, setLabel] = useState(undefined);
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    let newLabel;
    if (valueMultiple.length > 5) {
      newLabel = (
        <Box width="small">
          <>
            {valueMultiple &&
              dummyOptions
                .filter((i) => valueMultiple.indexOf(i) !== -1)
                .map((i) => {
                  if (valueMultiple.indexOf(i) < 5)
                    return (
                      <Button
                        onClick={() => {
                          const newValue = valueMultiple.filter((v) => v !== i);
                          setValueMultiple(newValue);
                        }}
                      >
                        <Box key={i}>
                          <CheckBox
                            fill
                            flex={false}
                            label={
                              <Box
                                alignSelf="center"
                                width="100%"
                                align="start"
                              >
                                {i}
                              </Box>
                            }
                            key={i}
                            pad="xsmall"
                            tabIndex="-1"
                            checked={true}
                            // onChange={(event) => {
                            //   const newValue = valueMultiple.filter(
                            //     (v) => v !== i,
                            //   );
                            //   setValueMultiple(newValue);
                            // }}
                          />
                        </Box>
                      </Button>
                    );
                })}
          </>
          <Box alignSelf="start">
            <Button
              onClick={() => setOpen(true)}
              size="small"
              label={`+ ${valueMultiple.length - 5} more`}
            />
          </Box>
        </Box>
      );
    } else {
      newLabel = (
        <Box width="small">
          {valueMultiple &&
            dummyOptions
              .filter((i) => valueMultiple.indexOf(i) !== -1)
              .map((i) => (
                <Button
                  onClick={() => {
                    const newValue = valueMultiple.filter((v) => v !== i);
                    setValueMultiple(newValue);
                  }}
                >
                  <Box key={i}>
                    <CheckBox
                      fill
                      flex={false}
                      label={
                        <Box alignSelf="center" width="100%" align="start">
                          {i}
                        </Box>
                      }
                      key={i}
                      pad="xsmall"
                      tabIndex="-1"
                      checked={true}
                      // onChange={(event) => {
                      //   const newValue = valueMultiple.filter((v) => v !== i);
                      //   setValueMultiple(newValue);
                      // }}
                    />
                  </Box>
                </Button>
              ))}
        </Box>
      );
    }
    if (valueMultiple.length > 0) setLabel(newLabel);
    else setLabel(undefined);
  }, [valueMultiple]);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" pad="large" gap="large">
      <Text>Multi-Select Variant</Text>
      <Select
        width="medium"
        variant={1}
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
        value={valueMultiple}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
          let next = [...valueMultiple];
          // loop through next selected and sort alphabetically
          next.sort();
          // remove next selected from options
          const sortedOptions = dummyOptions.filter((i) => !next.includes(i));

          next = next.filter((i) => dummyOptions.includes(i));
          // sort options alphabetically
          sortedOptions.sort();

          // concat next selected and options
          const sortedAllOptions = next.concat(sortedOptions);
          setOptions(sortedAllOptions);
        }}
        onChange={({ value, option }) => {
          setValueMultiple(value);
        }}
        valueLabel={label || undefined}
      >
        {(option) => <Option option={option} />}
      </Select>
    </Box>
    // </Grommet>
  );
};

MultiSelect.parameters = {
  chromatic: { disable: true },
};

MultiSelect.args = {
  full: true,
};

MultiSelect.storyName = 'Multi Select Option 1';

export default {
  title: 'Input/Select/Multi Select Option 1',
};
