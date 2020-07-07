import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MultiSelect, Text } from 'mnet-ui-base';

const Example = () => {
  const [value, setValue] = useState([
    'google.com',
    'media.net',
    'testing.com',
  ]);
  const [incExc, setIncExc] = useState(null);

  return (
    <Box fill align="center" justify="start" pad="large">
      <MultiSelect
        value={value}
        onValueChange={nextValue => {
          setValue(nextValue);
          console.log(nextValue, 'next');
        }}
        layout="double-column"
        width="medium"
        searchPlaceholder="Search"
        searchable
        renderEmptySelected={<Text>No domains selected</Text>}
        custom={{ label: 'Enter one domain per line' }}
        withInclusionExclusion={{ setIncExc: incExc, labelCount: 1 }}
        onIncExcChange={nextIncExc => {
          setIncExc(nextIncExc);
          console.log(nextIncExc, 'next');
        }}
      />
    </Box>
  );
};

storiesOf('MultiSelect', module).add('Domain Double Custom', () => <Example />);
