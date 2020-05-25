import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, TextArea } from 'mnet-ui-base';

const SimpleTextArea = props => {
  const [value, setValue] = React.useState('');

  const onChange = event => setValue(event.target.value);

  return (
    <>
      <Box align="center" pad="large">
        <TextArea value={value} onChange={onChange} {...props} />
      </Box>
    </>
  );
};

storiesOf('TextArea', module)
  .add('Simple', () => <SimpleTextArea resize />)
  .add('Non resizable', () => <SimpleTextArea resize={false} />);
