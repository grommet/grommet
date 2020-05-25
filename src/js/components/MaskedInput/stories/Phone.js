import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, MaskedInput } from 'mnet-ui-base';

const PhoneMaskedInput = () => {
  const [value, setValue] = React.useState('');

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <MaskedInput
            mask={[
              { fixed: '(' },
              {
                length: 3,
                regexp: /^[0-9]{1,3}$/,
                placeholder: 'xxx',
              },
              { fixed: ')' },
              { fixed: ' ' },
              {
                length: 3,
                regexp: /^[0-9]{1,3}$/,
                placeholder: 'xxx',
              },
              { fixed: '-' },
              {
                length: 4,
                regexp: /^[0-9]{1,4}$/,
                placeholder: 'xxxx',
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

storiesOf('MaskedInput', module).add('Phone', () => <PhoneMaskedInput />);
