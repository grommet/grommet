import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, MultiSelect, TextInput } from 'mnet-ui-base';
import { neo as mnet } from 'mnet-ui-base/themes/neo';

const options = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'];

const Example = () => {
  const [filteredOptions, setOptions] = useState(options);
  const [value, setValue] = useState([]);

  return(
    <MnetUIBase full theme={mnet}>
      <Box fill align="center" justify="start" pad="large">
        <MultiSelect
          options={filteredOptions}
          value={value}
          onValueChange={(nextValue) => setValue(nextValue)}
          layout="single-column"
          width="medium"
          onSearch={text => {
            const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
            const exp = new RegExp(escapedText, 'i');
            setOptions(options.filter(o => exp.test(o)));
          }}
          customSearch={({ search, onSearchChange }) => (
            <Box height="xxsmall" background="light-2">
              <TextInput
                value={search || ''}
                placeholder="Search"
                onChange={onSearchChange}
                plain
              />
            </Box>
          )}
        />
      </Box>
    </MnetUIBase>
  )
}

storiesOf('MultiSelect', module).add('Single Column', () => <Example />);