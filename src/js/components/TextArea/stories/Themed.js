import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const customTheme = deepMerge(grommet, {
  textArea: {
    extend: () => `
      font-size: 40px;
      color: red;
    `,
  },
});

const ThemedTextArea = () => {
  const [value, setValue] = React.useState('');

  const onChange = event => setValue(event.target.value);

  return (
    <Grommet theme={customTheme}>
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

storiesOf('TextArea', module).add('Themed', () => <ThemedTextArea />);
