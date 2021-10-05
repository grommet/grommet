import React from 'react';
import { Box, Grommet, MaskedInput } from 'grommet';
import { grommet } from 'grommet/themes';

export const UrlMaskedInput = () => {
  const [value, setValue] = React.useState('');
  const [value2, setValue2] = React.useState('');

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium" gap="medium">
          <MaskedInput
            mask={[
              { fixed: 'https://' },
              { regexp: /^[A-Za-z0-9_]*$/, placeholder: 'mysubdomain' },
              { fixed: '.foobar.'},
              { regexp: /^[A-Za-z0-9_]*$/, placeholder: 'com'},
            ]}
            value={value}
            onChange={event => setValue(event.target.value)}
          />
          <MaskedInput
            alwaysShowMask
            mask={[
              { fixed: 'https://' },
              { regexp: /^[^./:]*$/, placeholder: 'mysubdomain' },
              { fixed: '.foobar.' },
              { regexp: /^[A-Za-z0-9_]*$/, placeholder: 'com'},

            ]}
            value={value2}
            onChange={event => setValue2(event.target.value)}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

UrlMaskedInput.storyName = 'URL';

UrlMaskedInput.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/MaskedInput/URL',
};
