import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, MultiSelect } from 'mnet-ui-base';
import { neo as mnet } from 'mnet-ui-base/themes/neo';

const Example = () => {
  const [value, setValue] = useState({
    isInclude: true,
    items: ['google.com', 'media.net', 'testing.com'],
  });

  return (
    <MnetUIBase full theme={mnet}>
      <Box fill align="center" justify="start" pad="large">
        <MultiSelect
          value={value}
          onValueChange={nextValue => {
            setValue(nextValue);
            console.log(nextValue, 'next');
          }}
          layout="double-column"
          type="domain"
          width="medium"
          searchPlaceholder="Search"
          searchable
        />
      </Box>
    </MnetUIBase>
  );
};

storiesOf('MultiSelect', module).add('Domain Double Column', () => <Example />);
