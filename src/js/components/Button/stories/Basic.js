import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Button, Grommet } from 'grommet';

const BasicButtons = props => (
  <Grommet theme={grommet}>
    <Box align="center" pad="medium">
      <Button label="Default" onClick={() => {}} {...props} />
    </Box>
    <Box align="center" pad="medium">
      <Button label="Anchor" href="#" />
    </Box>
    <Box align="center" pad="medium">
      <Button disabled label="Disabled" onClick={() => {}} {...props} />
    </Box>
    <Box align="center" pad="medium">
      <Button primary label="Primary" onClick={() => {}} {...props} />
    </Box>
    <Box align="center" pad="medium">
      <Button
        primary
        label="Active Primary"
        active
        onClick={() => {}}
        {...props}
      />
    </Box>
  </Grommet>
);

storiesOf('Button', module).add('Basic', () => <BasicButtons />);
