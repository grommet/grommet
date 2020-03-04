import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, RangeInput } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const SimpleRangeInput = () => {
  const [value, setValue] = React.useState(5);

  const onChange = event => setValue(event.target.value);

  return (
    <MnetUIBase theme={mnet}>
      <Box align="center" pad="large">
        <RangeInput value={value} onChange={onChange} />
      </Box>
    </MnetUIBase>
  );
};

storiesOf('RangeInput', module).add('Simple', () => <SimpleRangeInput />);
