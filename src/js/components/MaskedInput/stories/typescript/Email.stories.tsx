import React from 'react';

import { Box, MaskedInput } from 'grommet';
import { MailOption } from 'grommet-icons';

export const EmailMaskedInput = () => {
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
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium" gap="medium">
        <MaskedInput
          icon={<MailOption />}
          mask={emailMask}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <MaskedInput
          reverse
          icon={<MailOption />}
          mask={emailMask}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </Box>
    </Box>
    // </Grommet>
  );
};

EmailMaskedInput.storyName = 'Email with icon';

EmailMaskedInput.args = {
  full: true,
};

export default {
  title: 'Input/MaskedInput/Email with icon',
};
