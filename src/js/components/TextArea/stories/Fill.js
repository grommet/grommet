import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';

const FillTextArea = () => {
  const [value, setValue] = React.useState('');

  const onChange = event => setValue(event.target.value);

  return (
    <Grommet theme={grommet}>
      <Box
        width="large"
        height="medium"
        border={{ color: 'brand', size: 'medium' }}
      >
        <TextArea value={value} onChange={onChange} fill />
      </Box>
    </Grommet>
  );
};

storiesOf('TextArea', module).add('Fill', () => <FillTextArea />);
