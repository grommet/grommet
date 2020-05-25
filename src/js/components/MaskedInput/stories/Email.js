import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, MaskedInput } from 'mnet-ui-base';

const EmailMaskedInput = () => {
  const [value, setValue] = React.useState('');

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <MaskedInput
            mask={[
              {
                regexp: /^[\w\-_.]+$/,
                placeholder: 'example',
              },
              { fixed: '@' },
              {
                regexp: /^[\w]+$/,
                placeholder: 'my',
              },
              { fixed: '.' },
              {
                regexp: /^[\w]+$/,
                placeholder: 'com',
              },
            ]}
            value={value}
            onChange={event => setValue(event.target.value)}
          />
        </Box>
      </Box>
    </div>
  );
};

storiesOf('MaskedInput', module).add('Email', () => <EmailMaskedInput />);
