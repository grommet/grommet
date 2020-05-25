import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button } from 'mnet-ui-base';
import { Next, Add } from 'grommet-icons';

const SizedButton = () => (
  <>
    <Box direction="row">
      <Box align="start" pad="large" gap="large">
        <Button size="small" label="Small" />
        <Button size="medium" label="Medium" />
        <Button label="Default" />
        <Button size="large" label="Large" />
      </Box>
      <Box align="start" pad="large" gap="large">
        <Button primary size="small" label="Small" />
        <Button primary size="medium" label="Medium" />
        <Button primary label="Default" />
        <Button primary size="large" label="Large" />
      </Box>
      <Box align="start" pad="large" gap="large">
        <Button size="small" label="Small" icon={<Next />} reverse />
        <Button size="medium" label="Medium" icon={<Next />} reverse />
        <Button label="Default" icon={<Next />} reverse />
        <Button size="large" label="Large" icon={<Next />} reverse />
      </Box>
      <Box align="start" pad="large" gap="large">
        <Button size="small" icon={<Add />} primary />
        <Button size="medium" icon={<Add />} primary />
        <Button icon={<Add />} primary />
        <Button size="large" icon={<Add />} primary />
      </Box>
    </Box>
  </>
);

storiesOf('Button', module).add('Sizes', () => <SizedButton active />);
