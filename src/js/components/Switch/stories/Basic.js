import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box } from 'mnet-ui-base';
import { Switch } from '../Switch';

const BasicSwitch = props => {
  const [value, setValue] = useState('1');
  const options = [
    { label: 'Value 1', value: '1' },
    { label: 'Value 2', value: '2' },
  ];
  return (
    <Box align="center" pad="large">
      <Switch
        value={value}
        options={options}
        onValueChange={({ target: { value: _ }}) => setValue(_)}
        {...props}
      />
    </Box>
  );
};

storiesOf('Switch', module).add('Basic', () => <BasicSwitch />);
storiesOf('Switch', module).add('Disabled', () => <BasicSwitch disabled />);
