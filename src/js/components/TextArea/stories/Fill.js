import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, TextArea } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const FillTextArea = () => {
  const [value, setValue] = React.useState('');

  const onChange = event => setValue(event.target.value);

  return (
    <MnetUIBase theme={mnet}>
      <Box
        width="large"
        height="medium"
        border={{ color: 'brand', size: 'medium' }}
      >
        <TextArea value={value} onChange={onChange} fill />
      </Box>
    </MnetUIBase>
  );
};

storiesOf('TextArea', module).add('Fill', () => <FillTextArea />);
