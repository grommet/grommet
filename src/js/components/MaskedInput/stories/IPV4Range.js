import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, MnetUIBase, MaskedInput } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const IPv4ElementExp = /^[0-1][0-9][0-9]$|^2[0-4][0-9]$|^25[0-5]$|^[0-9][0-9]$|^[0-9]$/;

const IPv4RangeMaskedInput = () => {
  const [value, setValue] = React.useState('');

  return (
    <MnetUIBase full theme={mnet}>
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
    </MnetUIBase>
  );
};

storiesOf('MaskedInput', module).add('IPv4 Range', () => (
  <IPv4RangeMaskedInput />
));
