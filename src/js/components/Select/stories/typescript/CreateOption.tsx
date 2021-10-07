import React, { useState } from 'react';
import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

// the prefix name of the Create option entry
const prefix = 'Create';

const defaultOptions = [];
for (let i = 1; i <= 5; i += 1) {
  defaultOptions.push(`option ${i}`);
}

const updateCreateOption = (text: string) => {
  const len = defaultOptions.length;
  if (defaultOptions[len - 1].includes(prefix)) {
    // remove Create option before adding an updated one
    defaultOptions.pop();
  }
  defaultOptions.push(`${prefix} '${text}'`);
};

// improving Search support of special characters
const getRegExp = text => {
  // The line below escapes regular expression special characters:
  // [ \ ^ $ . | ? * + ( )
  const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

  // Create the regular expression with modified value which
  // handles escaping special characters. Without escaping special
  // characters, errors will appear in the console
  return new RegExp(escapedText, 'i');
};

export const CreateOption = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Select
          open
          size="medium"
          placeholder="Select"
          value={value}
          options={options}
          onChange={({ option }) => {
            if (option.includes(prefix)) {
              defaultOptions.pop(); // remove Create option
              defaultOptions.push(searchValue);
              setValue(searchValue);
            } else {
              setValue(option);
            }
          }}
          onClose={() => setOptions(defaultOptions)}
          onSearch={(text: string) => {
            updateCreateOption(text);
            const exp = getRegExp(text);
            setOptions(defaultOptions.filter(o => exp.test(o)));
            setSearchValue(text);
          }}
        />
      </Box>
    </Grommet>
  );
};

CreateOption.storyName = 'Create option';

export default {
  title: 'Input/Select/Create option',
};
