import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, MnetUIBase, MaskedInput } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const SizeUnitsMaskedInput = () => {
  const [value, setValue] = React.useState('');

  return (
    <MnetUIBase full theme={mnet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <MaskedInput
            mask={[
              {
                length: [1, 4],
                options: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
                regexp: /^\d{1,4}$/,
                placeholder: 'nnn',
              },
              { fixed: ' ' },
              {
                length: 2,
                options: ['MB', 'GB', 'TB'],
                regexp: /^[mgt]b$|^[MGT]B$|^[mMgGtT]$/,
                placeholder: 'gb',
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

storiesOf('MaskedInput', module).add('Size + Units', () => (
  <SizeUnitsMaskedInput />
));
