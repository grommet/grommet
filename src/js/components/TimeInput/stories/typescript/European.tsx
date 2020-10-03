import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import { Box, TimeInput, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => {
  const [value, setValue] = React.useState();
  const onChange = event => {
    const nextValue = event.value;
    console.log('onChange', nextValue);
    setValue(nextValue);
  };
  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium" gap="medium">
          <TimeInput format="hh:mm" value={value} onChange={onChange} />
        </Box>
      </Box>
    </Grommet>
  );
};

if (!isChromatic()) {
  storiesOf('TimeInput', module).add('European', () => <Example />);
}
