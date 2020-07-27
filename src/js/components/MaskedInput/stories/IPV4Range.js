import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, MaskedInput } from 'grommet';
import { grommet } from 'grommet/themes';

const IPv4ElementExp = /^[0-1][0-9][0-9]$|^2[0-4][0-9]$|^25[0-5]$|^[0-9][0-9]$|^[0-9]$/;

const IPv4RangeMaskedInput = () => {
  const [value, setValue] = React.useState('');

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <MaskedInput
            mask={[
              {
                length: [1, 3],
                regexp: IPv4ElementExp,
                placeholder: 'xxx',
              },
              { fixed: '.' },
              {
                length: [1, 3],
                regexp: IPv4ElementExp,
                placeholder: 'xxx',
              },
              { fixed: '.' },
              {
                length: [1, 3],
                regexp: IPv4ElementExp,
                placeholder: 'xxx',
              },
              { fixed: '.' },
              {
                length: [1, 3],
                regexp: IPv4ElementExp,
                placeholder: 'xxx',
              },
              { fixed: ' - ' },
              {
                length: [1, 3],
                regexp: IPv4ElementExp,
                placeholder: 'xxx',
              },
              { fixed: '.' },
              {
                length: [1, 3],
                regexp: IPv4ElementExp,
                placeholder: 'xxx',
              },
              { fixed: '.' },
              {
                length: [1, 3],
                regexp: IPv4ElementExp,
                placeholder: 'xxx',
              },
              { fixed: '.' },
              {
                length: [1, 3],
                regexp: IPv4ElementExp,
                placeholder: 'xxx',
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

storiesOf('MaskedInput', module).add('IPv4 Range', () => (
  <IPv4RangeMaskedInput />
));
