import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button } from 'mnet-ui-base';

const Colored = props => (
  <div>
    <Box align="center" pad="large" gap="small">
      <Button primary label="Submit" onClick={() => {}} />
      <Button
        primary
        color="dark-1"
        label="custom theme text colored"
        onClick={() => {}}
      />
      <Button
        primary
        color="dark-1"
        label="dark-1"
        onClick={() => {}}
        {...props}
      />
      <Button
        primary
        color="#111111"
        label="#111111"
        onClick={() => {}}
        {...props}
      />
      <Button primary color="#777" label="#777" onClick={() => {}} {...props} />
      <Button
        plain
        color="red"
        label="plain red"
        onClick={() => {}}
        {...props}
      />
      <Button plain label="plain inherit" onClick={() => {}} {...props} />
    </Box>
  </div>
);

storiesOf('Button', module).add('Colored', () => <Colored />);
