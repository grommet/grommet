import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import { Box, Grommet, MaskedInput } from 'grommet';
import { MailOption } from 'grommet-icons';
import { grommet } from 'grommet/themes';

const EmailMaskedInput = () => {
  const [value, setValue] = React.useState('');

  const emailMask = [
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
  ];

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium" gap="medium">
          <MaskedInput
            icon={<MailOption />}
            mask={emailMask}
            value={value}
            onChange={event => setValue(event.target.value)}
          />
          <MaskedInput
            reverse
            icon={<MailOption />}
            mask={emailMask}
            value={value}
            onChange={event => setValue(event.target.value)}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

if (!isChromatic()) {
  storiesOf('TypeScript/MaskedInput', module).add('Email', () => (
    <EmailMaskedInput />
  ));
}
