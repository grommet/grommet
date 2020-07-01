import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, MultiSelect } from 'mnet-ui-base';
import { neo as mnet } from 'mnet-ui-base/themes/neo';

const options = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'];

const Example = () => {
  const [value, setValue] = useState([]);

  return(
    <MnetUIBase full theme={mnet}>
      <Box fill align="center" justify="start" pad="large">
        <MultiSelect
          options={options}
          value={value}
          onValueChange={(nextValue) => setValue(nextValue)}
          layout="single-column"
          width="medium"
          withUpdateCancelButtons
        />
      </Box>
    </MnetUIBase>
  )
}

storiesOf('MultiSelect', module)
  .add('Single Column with Control Buttons', () => <Example />);
