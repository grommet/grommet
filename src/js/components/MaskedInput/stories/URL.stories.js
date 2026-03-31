import React from 'react';
import { Box, MaskedInput } from 'grommet';

export const UrlMaskedInput = () => {
  const [value, setValue] = React.useState('');

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium" gap="medium">
        <MaskedInput
          mask={[{ fixed: 'https://' }, { regexp: /^.*$/ }]}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </Box>
    </Box>
    // </Grommet>
  );
};

UrlMaskedInput.storyName = 'URL';

UrlMaskedInput.parameters = {
  chromatic: { disable: true },
};

UrlMaskedInput.args = {
  full: true,
};

export default {
  title: 'Input/MaskedInput/URL',
};
