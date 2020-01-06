import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, TextArea } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const SimpleTextArea = props => {
  const [value, setValue] = React.useState('');

  const onChange = event => setValue(event.target.value);

  return (
    <MnetUIBase theme={mnet}>
      <Box align="center" pad="large">
        <TextArea value={value} onChange={onChange} {...props} />
      </Box>
    </MnetUIBase>
  );
};

storiesOf('TextArea', module)
  .add('Simple', () => <SimpleTextArea resize />)
  .add('Non resizable', () => <SimpleTextArea resize={false} />);
