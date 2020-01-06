import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, MnetUIBase, MaskedInput } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const PhoneMaskedInput = () => {
  const [value, setValue] = React.useState('');

  return (
    <MnetUIBase full theme={mnet}>
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
    </MnetUIBase>
  );
};

storiesOf('MaskedInput', module).add('Phone', () => <PhoneMaskedInput />);
