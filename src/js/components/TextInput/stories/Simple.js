import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, TextInput } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const SimpleTextInput = () => {
  const [value, setValue] = React.useState('');

  const onChange = event => setValue(event.target.value);

  return (
    <MnetUIBase full theme={mnet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <TextInput value={value} onChange={onChange} />
        </Box>
      </Box>
    </MnetUIBase>
  );
};

storiesOf('TextInput', module).add('Simple', () => <SimpleTextInput />);
