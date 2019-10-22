import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';

const SimpleTextArea = props => {
  const [value, setValue] = React.useState('');

  const onChange = event => setValue(event.target.value);

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <TextArea value={value} onChange={onChange} {...props} />
      </Box>
    </Grommet>
  );
};

storiesOf('TextArea', module)
  .add('Simple', () => <SimpleTextArea resize />)
  .add('Non resizable', () => <SimpleTextArea resize={false} />);
