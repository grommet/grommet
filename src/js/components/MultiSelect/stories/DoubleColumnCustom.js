import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MultiSelect, Text } from 'mnet-ui-base';

const Example = () => {
  const [value, setValue] = useState([
    'google.com',
    'media.net',
    'testing.com',
    'google.com',
    'media.net',
    'testing.com',
    'google.com',
    'media.net',
    'testing.com',
  ]);
  const [isExcluded, setIncExc] = useState(null);

  const validateDomains = values => {
    const regx = /^((http|https):\/\/)?([a-zA-Z0-9_][-_a-zA-Z0-9]{0,62}\.)+([a-zA-Z0-9]{1,10})$/;
    return values && values.every(val => regx.test(val));
  };

  return (
    <Box fill align="center" justify="start" pad="large">
      <MultiSelect
        value={value}
        onValueChange={nextValue => setValue(nextValue)}
        layout="double-column"
        width="medium"
        height="large"
        searchPlaceholder="Search"
        searchable
        custom={{ label: 'Enter one domain per line' }}
        withInclusionExclusion
        isExcluded={isExcluded}
        onIncExcChange={nextIncExc => setIncExc(nextIncExc)}
        renderEmptySelected={<Text>No domains selected</Text>}
        validate={{
          callback: validateDomains,
          message: 'Please Enter Correct Domains',
        }}
      />
    </Box>
  );
};

storiesOf('MultiSelect', module).add('Domain Double Custom', () => <Example />);
