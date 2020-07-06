import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MultiSelect, Text } from 'mnet-ui-base';

const Example = () => {
  const [value, setValue] = useState({
    isInclude: true,
    values: ['google.com', 'media.net', 'testing.com'],
  });

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
        custom
      />
    </Box>
  );
};

storiesOf('MultiSelect', module).add('Domain Double Custom', () => <Example />);
