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

export const MultiSelect2 = () => {
  const [options, setOptions] = useState(dummyOptions.sort());
  const [valueMultiple, setValueMultiple] = useState([]);
  const [intermediateValue, setIntermediateValue] = useState(valueMultiple);
  const [label, setLabel] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [showAccessDiv, setShowAccessDiv] = useState(undefined);
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
    let intermediate = intermediateValue;
    let newLabel = (
      <Box
        width="100%"
        role="listbox"
        aria-multiselectable={true}
        a11yTitle="Selected Options"
      >
        {valueMultiple &&
          dummyOptions
            .filter((i) => valueMultiple.indexOf(i) !== -1)
            .map((i) => {
              // const [showAccessDiv, setShowAccessDiv] = useState(false);
              let showAccessDiv = false;
              if (valueMultiple.indexOf(i) < 5) {
                return (
                  <>
                    <Button
                      role="option"
                      a11yTitle={
                        intermediate.includes(i)
                          ? `${i} selected`
                          : `${i} not selected`
                      }
                      aria-setsize={intermediate.length}
                      aria-posinset={intermediate.indexOf(i)}
                      aria-selected={intermediate.includes(i)}
                      plain
                      hoverIndicator
                      fill="horizontal"
                      tabIndex="0"
                      onClick={() => {
                        // if (intermediate.includes(i)) {
                        intermediate = intermediate.filter((v) => v !== i);
                        setShowAccessDiv(i);
                        setIntermediateValue(intermediate);
                        setValueMultiple(intermediate);
                        // showAccessDiv = true;
                        // } else {
                        //   intermediate.push(i);
                        //   intermediate.sort();
                        //   let temp = intermediate.concat(valueMultiple);
                        //   console.log(
                        //     temp.filter(
                        //       (item, pos) => temp.indexOf(item) === pos,
                        //     ),
                        //   );
                        //   temp.sort();
                        //   setValueMultiple(
                        //     temp.filter(
                        //       (item, pos) => temp.indexOf(item) === pos,
                        //     ),
                        //   );
                        // }
                      }}
                    >
                      {/* <Box key={i}> */}
                      <CheckBox
                        label={
                          <Box alignSelf="center" width="100%" align="start">
                            {i}
                          </Box>
                        }
                        key={i}
                        pad="xsmall"
                        tabIndex="-1"
                        checked={intermediate.includes(i)}
                      />
                      {/* </Box> */}
                    </Button>
                  </>
                );
              }
            })}
        {showAccessDiv && (
          <Box
            style={{ height: '0px' }}
            overflow="hidden"
            // aria-live="assertive"
            aria-live="polite"
          >
            <Text>removed {showAccessDiv}</Text>
          </Box>
        )}
        {valueMultiple.length > 5 && (
          <Box alignSelf="start">
            <Button
              onClick={() => {
                setValueMultiple(intermediateValue);
                setOpen(true);
                let next = [...intermediateValue];
                next.sort();
                const sortedOptions = dummyOptions.filter(
                  (i) => !next.includes(i),
                );
                next = next.filter((i) => dummyOptions.includes(i));
                sortedOptions.sort();
                const sortedAllOptions = next.concat(sortedOptions);
                setOptions(sortedAllOptions);
              }}
              size="small"
              label={`+ ${valueMultiple.length - 5} more`}
            />
          </Box>
        )}
      </Box>
    );
    if (valueMultiple.length > 0) setLabel(newLabel);
    else setLabel(undefined);
  }, [valueMultiple, intermediateValue, showAccessDiv]);

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
        placeholder="Select Fruits"
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
          setValueMultiple(intermediateValue);
          setOpen(true);
          let next = [...intermediateValue];
          next.sort();
          const sortedOptions = dummyOptions.filter((i) => !next.includes(i));
          next = next.filter((i) => dummyOptions.includes(i));
          sortedOptions.sort();
          const sortedAllOptions = next.concat(sortedOptions);
          setOptions(sortedAllOptions);
        }}
        onClose={() => {
          setIntermediateValue(valueMultiple);
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

MultiSelect2.parameters = {
  chromatic: { disable: true },
};

MultiSelect2.args = {
  full: true,
};

MultiSelect2.storyName = 'Multi Select Variant 2';

export default {
  title: 'Input/Select/Multi Select Variant 2',
};
