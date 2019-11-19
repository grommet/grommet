import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, MaskedInput } from 'grommet';
import { grommet } from 'grommet/themes';

const EmailMaskedInput = () => {
  const [value, setValue] = React.useState('');

  return (
    <Grommet full theme={grommet}>
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
    </Grommet>
  );
};

storiesOf('MaskedInput', module).add('Email', () => <EmailMaskedInput />);
