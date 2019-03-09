import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Button, Grommet } from 'grommet';

const ColoredButton = props => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large" gap="small">
      <Button
        primary
        color="dark-1"
        label="Submit dark-1"
        onClick={() => {}}
        {...props}
      />
      <Button
        primary
        color="#111111"
        label="Submit #111111"
        onClick={() => {}}
        {...props}
      />
      <Button
        primary
        color="#777"
        label="Submit #777"
        onClick={() => {}}
        {...props}
      />
    </Box>
  </Grommet>
);

storiesOf('Button', module).add('Colored', () => <ColoredButton />);
