import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

const defaultOptions = [];

const updateCreateOption = (text: string) => {
  defaultOptions.pop();
  defaultOptions.push(`Create '${text}'`);
};

const CreateOption = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Select
          size="medium"
          placeholder="Select"
          value={value}
          options={options}
          onChange={event => {
            const { option } = event;
            if (option.includes('Create')) {
              defaultOptions.pop();
              defaultOptions.push(searchValue);
              setValue(searchValue);
              defaultOptions.push('Create');
            } else {
              setValue(option);
            }
            console.log(searchValue);
            console.log(event);
          }}
          onClose={() => setOptions(defaultOptions)}
          onSearch={(text: string) => {
            updateCreateOption(text);
            // The line below escapes regular expression special characters:
            // [ \ ^ $ . | ? * + ( )
            const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

            // Create the regular expression with modified value which
            // handles escaping special characters. Without escaping special
            // characters, errors will appear in the console
            const exp = new RegExp(escapedText, 'i');
            setOptions(defaultOptions.filter(o => exp.test(o)));
            setSearchValue(text);
          }}
        />
      </Box>
    </Grommet>
  );
};

if (!isChromatic()) {
  storiesOf('TypeScript/Select', module).add('Create Option', () => (
    <CreateOption />
  ));
}
