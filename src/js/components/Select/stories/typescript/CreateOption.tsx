import React, { useState } from 'react';

import { FormDown, FormUp } from 'grommet-icons';
import { Box, Grommet, Select } from 'grommet';
import { ThemeType } from 'grommet/themes';

// the prefix name of the Create option entry
const prefix = 'Create';

// Type annotations can only be used in TypeScript files.
// Remove ': ThemeType' if you are not using Typescript.
const theme: ThemeType = {
  global: {
    font: {
      family: `Comic Sans MS, -apple-system,
         BlinkMacSystemFont`,
    },
  },
  select: {
    control: {
      open: {
        background: '#ece0fa',
        border: '1px solid #7D4CDB',
      },
      extend: 'padding: 3px 6px;',
    },
    icons: {
      down: FormDown,
      up: FormUp,
      color: 'dark-1',
      margin: 'small',
    },
  },
};

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
    <Grommet full theme={theme}>
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

CreateOption.story = {
  name: 'Create option',
};
