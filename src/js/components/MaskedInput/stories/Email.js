import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, MnetUIBase, MaskedInput } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const EmailMaskedInput = () => {
  const [value, setValue] = React.useState('');

  return (
    <MnetUIBase full theme={mnet}>
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
    </MnetUIBase>
  );
};

storiesOf('MaskedInput', module).add('Email', () => <EmailMaskedInput />);
